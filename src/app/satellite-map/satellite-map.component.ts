import { Component, OnInit, Input } from '@angular/core';
import { MapData } from './mapData'
import { TLE } from '../tle-list/tle';

// jquery
declare var $: any;
declare var satellite: any;

@Component({
  selector: 'app-satellite-map',
  templateUrl: './satellite-map.component.html',
  styleUrls: ['./satellite-map.component.css']
})
export class SatelliteMapComponent implements OnInit {

  public startDate: string = '';
  public endDate: string = '';
  public selectedTle: TLE[] = [];

  @Input()
  set display(tles: TLE[]) {
    this.selectedTle = tles;
  }

  constructor() { }

  ngOnInit() { }

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
