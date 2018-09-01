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
  private category: any = {};
  private tle: any = {};

  constructor() { }

  ngOnInit() { }

  // categories
  newCategory() {
    this.category = { name: '', description: '' }
  }

  getCategories() {

  }

  deleteCategory(categoryId: number) {

  }

  saveCategory(form) {
    form.reset();
    console.log(form)
  }

  // tle
  newTle() {
    this.tle = { name: '', line1: '', line2: '', category: 1 };
  }

  getTle(categoryId: number) {

  }

  deleteTle(tleId: number) {

  }

  saveTle(form) {
    form.reset();
    console.log(form)
  }

  toggleTle(tle: any) {
    let index = this.selectedTle.indexOf(this.selectedTle.filter((item) => { return item.name == tle.name })[0]);

    if (index > -1)
      this.selectedTle.slice(index, 1);
    else
      this.selectedTle.push(tle);
  }

}
