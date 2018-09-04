import { Component, OnInit, Input } from '@angular/core';
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

  public startDate: string = '';
  public endDate: string = '';
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
      worldCopyJump: true
    }).setView([0, 0], 1);

    L.tileLayer('osm/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a></a>',
    }).addTo(this.map);

    this.map.on('contextmenu', (event) => this.map.panTo([0, 0]));
  }

  setStartDate(date: string) {

  }

  setEndDate(date: string) {

  }

  toggleTle(tle: TLE) {
    let index = this.selectedTle.indexOf(this.selectedTle.filter((item) => { return item.name == tle.name })[0]);
    if (index >= 0)
      this.selectedTle.splice(index, 1);
    else
      this.selectedTle.push(tle);
  }

  // util
  showError(error) {
    console.log(error);
    $('span#errorModalTitle').text(error.status + ' ' + error.statusText);
    $('div#errorModalBody').html(error.error);
    $('div#errorModal').modal('show');
  }

}
