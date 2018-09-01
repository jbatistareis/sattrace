import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-satellite-map',
  templateUrl: './satellite-map.component.html',
  styleUrls: ['./satellite-map.component.css']
})
export class SatelliteMapComponent implements OnInit {

  private startDate: string = '';
  private endDate: string = '';
  private tleList: any[] = [];

  @Input()
  set display(tles: any[]) {
    this.tleList = tles;
  }

  constructor() { }

  setStartDate(date: string) {

  }

  setEndDate(date: string) {

  }

  toggleTle(tle: any) {

  }

  ngOnInit() {
  }

}
