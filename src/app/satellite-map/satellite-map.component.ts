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
  private markerIcon = L.divIcon({ className: '', html: '<span style="font-size: 35pt;">&#x01F6F0</span>' });

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
      layers: L.tileLayer('osm/{z}/{x}/{y}.png', {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
          + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a></a>'
      })
    });

    this.map.on('contextmenu', (event) => this.map.panTo([0, 0]));

    let tle = new TLE();
    tle.name = 'ISS (ZARYA)';
    tle.line1 = '1 25544U 98067A   18247.77707326  .00001928  00000-0  36632-4 0  9995';
    tle.line2 = '2 25544  51.6425 342.0667 0005865 125.4674  16.3192 15.53930075130897';
    this.toggleMapData(tle);

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
        L.marker([0, 0], { opacity: 0.0, icon: this.markerIcon }).addTo(this.map),
        L.polyline([], { color: 'grey' }).addTo(this.map));

      this.setSatellitePath(mapData);
      this.mapDataList.push(mapData);
    }
  }

  setSatellitePosition(mapData: MapData, date: Date, gmst: any) {
    let positionAndVelocity = satellite.propagate(mapData.orbitData, date);
    let geodeticCoords = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

    mapData.marker.setLatLng([satellite.degreesLat(geodeticCoords.latitude), satellite.degreesLong(geodeticCoords.longitude)]);
    mapData.marker.setOpacity(1.0);
    mapData.height = geodeticCoords.height;
  }

  setSatellitePath(mapData: MapData) {
    let pathDate = moment();

    for (let i = 0; i < 180; i++) {
      pathDate.add(i, 's');
      let convDate = pathDate.toDate();

      let positionAndVelocity = satellite.propagate(mapData.orbitData, convDate);
      let gmst = satellite.gstime(convDate);
      let geodeticCoords = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

      mapData.path.addLatLng([satellite.degreesLat(geodeticCoords.latitude), satellite.degreesLong(geodeticCoords.longitude)]);
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
