import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { MapData } from './mapData'
import { TLE } from '../tle-list/tle';

// jquery
declare var $: any;
declare var satellite: any;
declare var L: any;

@Component({
  selector: 'app-satellite-map',
  templateUrl: './satellite-map.component.html',
  styleUrls: ['./satellite-map.component.css']
})
export class SatelliteMapComponent implements OnInit {

  private map: any;
  private mapDataList: MapData[] = [];
  private markerIcon = L.divIcon({ className: '', iconAnchor: [20, 35], html: '<span style="font-size: 40px;">&#x01F6F0</span>' });

  public selectedTle: TLE[] = [];

  @Input()
  set display(tles: TLE[]) {
    this.selectedTle = tles;
  }

  constructor() { }

  ngOnInit() {
    // setup map
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 1,
      maxZoom: 3,
      worldCopyJump: true,
      maxBoundsViscosity: 1.0,
      maxBounds: L.latLngBounds([85, -180], [-85, 180]),
      layers: L.tileLayer('osm/{z}/{x}/{y}.png', {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
          + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a></a>'
      })
    });

    this.map.on('contextmenu', (event) => this.map.panTo([0, 0]));

    let tle1 = new TLE();
    tle1.name = 'ISS (ZARYA)';
    tle1.line1 = '1 25544U 98067A   18248.07344907  .00001903  00000-0  36250-4 0  9990';
    tle1.line2 = '2 25544  51.6425 340.5895 0005838 126.4338 234.4220 15.53931367130947';
    let tle2 = new TLE();
    tle2.name = 'FLOCK 2E\'-14';
    tle2.line1 = '1 41762U 98067KJ  18247.58864783  .00092841  00000-0  39330-3 0  9996';
    tle2.line2 = '2 41762  51.6310 286.8413 0003484  42.8751 317.2523 15.84579370112664';
    this.toggleMapData(tle1);
    this.toggleMapData(tle2);

    // update satellites every second
    setInterval(
      () => {
        let date = new Date();
        let gmst = satellite.gstime(date);

        for (let i = 0; i < this.mapDataList.length; i++)
          this.setSatellitePosition(this.mapDataList[i], date, gmst);
      },
      1000);
  }

  // when new tle is picked
  toggleMapData(tle: TLE) {
    let index = this.mapDataList.indexOf(this.mapDataList.filter((item) => { return item.name == tle.name; })[0]);
    if (index >= 0) {
      this.map.removeLayer(this.mapDataList[index].path);
      this.map.removeLayer(this.mapDataList[index].marker);
      this.mapDataList.splice(index, 1);
    } else {
      let mapData = new MapData(
        tle.name,
        satellite.twoline2satrec(tle.line1, tle.line2),
        L.marker([0, 0], { title: tle.name, opacity: 0.0, icon: this.markerIcon }).addTo(this.map),
        new L.Wrapped.Polyline([], { color: 'grey' }).addTo(this.map));

      this.setSatellitePath(mapData);
      this.mapDataList.push(mapData);
    }
  }

  setSatellitePosition(mapData: MapData, date: Date, gmst: any) {
    let positionAndVelocity = satellite.propagate(mapData.orbitData, date);
    let geodeticCoords = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

    mapData.marker.setLatLng([satellite.degreesLat(geodeticCoords.latitude).toFixed(3), satellite.degreesLong(geodeticCoords.longitude).toFixed(3)]);
    mapData.marker.setOpacity(1.0);
    mapData.height = geodeticCoords.height;
  }

  setSatellitePath(mapData: MapData) {
    let pathDate = moment();

    for (let i = 0; i < 120; i++) {
      pathDate.add(i, 'second');
      let convDate = pathDate.toDate();

      let positionAndVelocity = satellite.propagate(mapData.orbitData, convDate);
      let gmst = satellite.gstime(convDate);
      let geodeticCoords = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

      mapData.path.addLatLng([satellite.degreesLat(geodeticCoords.latitude).toFixed(3), satellite.degreesLong(geodeticCoords.longitude).toFixed(3)]);
    }
  }

  // util
  showError(error) {
    console.log(error);
    $('span#errorModalTitle').text(error.status + ' ' + error.statusText);
    $('div#errorModalBody').html(error.error);
    $('div#errorModal').modal('show');
  }

}
