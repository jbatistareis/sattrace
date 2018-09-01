import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-satellite-list',
  templateUrl: './satellite-list.component.html',
  styleUrls: ['./satellite-list.component.css']
})
export class SatelliteListComponent implements OnInit {

  private tleList: any[] = [];
  private categoriesList: any[] = [];
  private selectedTle: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  toggleTle(tle: any) {
    
  }

}
