import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-satellite-list',
  templateUrl: './satellite-list.component.html',
  styleUrls: ['./satellite-list.component.css']
})
export class SatelliteListComponent implements OnInit {

  public tleList: any[] = [];
  public categoryList: any[] = [];
  public noCategory: any = { id: 1, name: "No category" };

  public selectedTle: any[] = [];
  public category: any = this.noCategory;
  public formCategory: any = {};
  public formTle: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCategories();
    this.getTle(1);
  }

  // categories
  newCategory() {
    this.formCategory = { name: '', description: '' }
  }

  getCategories() {
    this.http.get('category/').subscribe(
      (response) => { this.categoryList = response as Array<any> },
      (error) => console.log(error)
    );
  }

  deleteCategory() {
    this.http.delete('category/' + this.formCategory.id).subscribe(
      (response) => this.getCategories(),
      (error) => console.log(error)
    );
  }

  saveCategory(form) {
    this.http.post('category/', this.formCategory).subscribe(
      (response) => {
        this.getCategories();
        form.reset();
      },
      (error) => console.log(error)
    );
  }

  loadCategoryData(category: any) {
    this.getTle(category.id);
    this.formCategory = category;
  }

  // tle
  newTle() {
    this.formTle = { name: '', line1: '', line2: '', category: 1 };
  }

  getTle(categoryId: number) {
    this.http.get('tle/' + categoryId).subscribe(
      (response) => { this.tleList = response as Array<any> },
      (error) => console.log(error)
    );
  }

  deleteTle() {
    this.http.delete('tle/' + this.formTle.id).subscribe(
      (response) => this.getTle(this.formCategory.id),
      (error) => console.log(error)
    );
  }

  saveTle(form) {
    this.formTle.category = this.formCategory.id;
    this.http.post('tle/', this.formTle).subscribe(
      (response) => {
        this.getTle(this.formCategory.id);
        form.reset();
      },
      (error) => console.log(error)
    );
  }

  toggleTle(tle: any) {
    let index = this.selectedTle.indexOf(this.selectedTle.filter((item) => { return item.name == tle.name })[0]);
    if (index >= 0)
      this.selectedTle.splice(index, 1);
    else
      this.selectedTle.push(tle);
  }

}
