import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-satellite-map',
  templateUrl: './satellite-map.component.html',
  styleUrls: ['./satellite-map.component.css']
})
export class SatelliteMapComponent implements OnInit {

  private startDate: string = '';
  private endDate: string = '';
  private selectedTle: any[] = [];

  @Input()
  set display(tles: any[]) {
    this.selectedTle = tles;
  }

  constructor() { }

  ngOnInit() { }

  setStartDate(date: string) {

  }

  setEndDate(date: string) {

  }

  toggleTle(tle: any) {
    let index = this.selectedTle.indexOf(this.selectedTle.filter((item) => { return item.name == tle.name })[0]);

    if (index > -1)
      this.selectedTle.slice(index, 1);
    else
      this.selectedTle.push(tle);
  }

}
