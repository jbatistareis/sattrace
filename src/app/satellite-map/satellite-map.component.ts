import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { TleTrackService } from '../tle-track.service';
import { MapData } from './mapData';
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
  private markerIcon = L.divIcon({ className: '', iconAnchor: [20, 35], html: '<span style="font-size: 40px;">&#x01F6F0</span>' });
  private mapDataList: MapData[] = [];

  constructor(private tleTrackService: TleTrackService) { }

  ngOnInit() {
    // setup map
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 1,
      maxZoom: 4,
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
    L.control.scale().addTo(this.map);

    // updaters
    setInterval(() => this.updateSatellitePositions(), 2000);
    setInterval(() => this.updatePathPositions(), 60000);

    // listeners
    this.tleTrackService.toggleTle.subscribe((tle) => this.toggleMapData(tle));
    this.tleTrackService.updatedTle.subscribe((tle) => this.updateSatelliteTle(tle));
  }

  selectedTle(): TLE[] {
    return this.tleTrackService.tleList;
  }

  toggleTle(tle: TLE) {
    this.tleTrackService.toggle(tle);
  }

  toggleMapData(tle: TLE) {
    let index = this.findMapListIndexByTLEId(tle.id);
    if (index >= 0) {
      this.map.removeLayer(this.mapDataList[index].path);
      this.map.removeLayer(this.mapDataList[index].marker);
      this.mapDataList.splice(index, 1);
    } else {
      let mapData = new MapData(
        tle.id,
        tle.name,
        tle.color,
        satellite.twoline2satrec(tle.line1, tle.line2),
        L.marker([0, 0], { opacity: 0.0, icon: this.markerIcon }).bindTooltip('').bindPopup('').addTo(this.map),
        new L.Wrapped.Polyline([], { color: tle.color, smoothFactor: 2.0 }).bindTooltip(tle.name).addTo(this.map));

      this.mapDataList.push(mapData);

      this.updatePathPositions();
      this.updateSatellitePositions();
    }
  }

  setSatellitePosition(mapData: MapData) {
    let date = new Date();
    let positionAndVelocity = satellite.propagate(mapData.orbitData, date);
    let geodeticCoords = satellite.eciToGeodetic(positionAndVelocity.position, satellite.gstime(date));

    mapData.marker.setLatLng([satellite.degreesLat(geodeticCoords.latitude).toFixed(3), satellite.degreesLong(geodeticCoords.longitude).toFixed(3)]);
    mapData.marker.setOpacity(1.0);
    mapData.height = geodeticCoords.height;

    this.setSatelliteIformation(mapData);
  }

  setSatellitePath(mapData: MapData) {
    let finalCoords = [];
    let coordMoment = moment();
    coordMoment.subtract(1, 'hour');


    for (let i = 0; i < 180; i++) {
      coordMoment.add(1, 'minute');
      let coordDate = coordMoment.toDate();

      let positionAndVelocity = satellite.propagate(mapData.orbitData, coordDate);
      let geodeticCoords = satellite.eciToGeodetic(positionAndVelocity.position, satellite.gstime(coordDate));

      finalCoords.push([satellite.degreesLat(geodeticCoords.latitude).toFixed(3), satellite.degreesLong(geodeticCoords.longitude).toFixed(3)]);
    }

    mapData.path.setLatLngs(finalCoords);
  }

  findMapListIndexByTLEId(id): number {
    return this.mapDataList.indexOf(this.mapDataList.filter((item) => { return item.id === id; })[0]);
  }

  updateSatelliteTle(tle: TLE) {
    this.mapDataList[this.findMapListIndexByTLEId(tle.id)].orbitData = satellite.twoline2satrec(tle.line1, tle.line2);
  }

  updateSatellitePositions() {
    for (let i = 0; i < this.mapDataList.length; i++)
      this.setSatellitePosition(this.mapDataList[i]);
  }

  updatePathPositions() {
    for (let i = 0; i < this.mapDataList.length; i++)
      this.setSatellitePath(this.mapDataList[i]);
  }

  setSatelliteIformation(mapData: MapData) {
    let html =
      '<table class="text-monospace">'
      + '<tr><td colspan="2"><label><b>' + mapData.name + '</b></label></td></tr>'
      + '<tr><td><b>lat.</b></td><td>' + mapData.marker.getLatLng().lat + '°</td></tr>'
      + '<tr><td><b>lng.</b></td><td>' + mapData.marker.getLatLng().lng + '°</td></tr>'
      + '<tr><td><b>hgt.</b></td><td>' + Math.round(mapData.height) + 'km</td></tr>'
      + '</table>'

    mapData.marker.setTooltipContent(html);
    mapData.marker.setPopupContent(html);
  }

  // util
  showError(error) {
    console.log(error);
    $('span#errorModalTitle').text(error.status + ' ' + error.statusText);
    $('div#errorModalBody').html(error.error);
    $('div#errorModal').modal('show');
  }

}
