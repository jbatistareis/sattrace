import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-tle-list',
  templateUrl: './tle-list.component.html',
  styleUrls: ['./tle-list.component.css']
})
export class TleListComponent implements OnInit {

  public tleList: any[] = [];
  public categoryList: any[] = [];
  public noCategory: any = { id: 1, name: "No category" };
  public searchResults: any;

  public selectedTle: any[] = [];
  public category: any = this.noCategory;
  public formCategory: any = {};
  public formTle: any = {};
  public search: string;

  private confirmDelete: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCategories();
    this.getTle(1);

    $('[data-toggle=popover]').popover();
    $('div#categoryEditModal').on('show.bs.modal', (event) => { this.confirmDelete = false; });
    $('div#tleEditModal').on('show.bs.modal', (event) => { this.confirmDelete = false; });
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
    if (this.confirmDelete)
      this.http.delete('category/' + this.formCategory.id).subscribe(
        (response) => {
          $('div#categoryEditModal').modal('hide');
          this.getCategories();
        },
        (error) => console.log(error)
      );

    this.confirmDelete = !this.confirmDelete;
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
    if (categoryId > 0)
      this.http.get('tle/' + categoryId).subscribe(
        (response) => {
          this.searchResults = undefined;
          this.tleList = response as Array<any>;
        },
        (error) => console.log(error)
      );
  }

  deleteTle() {
    if (this.confirmDelete)
      this.http.delete('tle/' + this.formTle.id).subscribe(
        (response) => {
          $('div#tleEditModal').modal('hide');
          this.getTle(this.formCategory.id);
        },
        (error) => console.log(error)
      );

    this.confirmDelete = !this.confirmDelete;
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

  execSearch(value: string) {
    if (value.length > 0)
      this.http.post('search/', { name: value }).subscribe(
        (response) => {
          this.searchResults = { id: 0, name: 'Search: ' + '"' + value + '"' };
          this.category = this.searchResults;
          this.tleList = response as Array<any>;
        },
        (error) => console.log(error)
      );
  }

}
