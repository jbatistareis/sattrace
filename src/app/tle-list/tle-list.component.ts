import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';
import { TLE } from './tle';

declare var $: any;

@Component({
  selector: 'app-tle-list',
  templateUrl: './tle-list.component.html',
  styleUrls: ['./tle-list.component.css']
})
export class TleListComponent implements OnInit {

  public tleList: TLE[] = [];
  public categoryList: Category[] = [];
  public noCategory: Category = new Category(1, 'No category');
  public searchResults: Category = undefined;

  public selectedTle: TLE[] = [];
  public category: Category = this.noCategory;
  public formCategory: Category = new Category();
  public formTle: TLE = new TLE();
  public search: string;

  private confirmDelete: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCategories();
    this.loadCategoryData(this.noCategory);

    $('[data-toggle=popover]').popover();
    $('div#categoryEditModal').on('show.bs.modal', (event) => { this.confirmDelete = false; });
    $('div#tleEditModal').on('show.bs.modal', (event) => { this.confirmDelete = false; });
  }

  // categories
  newCategory() {
    this.formCategory = new Category(undefined, '', undefined);
  }

  getCategories() {
    this.http.get('category/').subscribe(
      (response) => { this.categoryList = response as Array<Category>; },
      (error) => this.showError(error)
    );
  }

  deleteCategory() {
    if (this.confirmDelete)
      this.http.delete('category/' + this.formCategory.id).subscribe(
        (response) => {
          $('div#categoryEditModal').modal('hide');
          this.getCategories();
          this.loadCategoryData(this.noCategory);
        },
        (error) => this.showError(error)
      );

    this.confirmDelete = !this.confirmDelete;
  }

  saveCategory(form) {
    this.http.post('category/', this.formCategory).subscribe(
      (response) => {
        $('div#categoryEditModal').modal('hide');
        this.getCategories();
        form.reset();
      },
      (error) => this.showError(error)
    );
  }

  loadCategoryData(category: Category) {
    this.getTle(category.id);
    this.formCategory = category;
  }

  // tle
  newTle() {
    this.formTle = new TLE();
  }

  getTle(categoryId: number) {
    if (categoryId > 0)
      this.http.get('tle/' + categoryId).subscribe(
        (response) => {
          this.searchResults = undefined;
          this.tleList = response as Array<TLE>;
        },
        (error) => this.showError(error)
      );
  }

  deleteTle() {
    if (this.confirmDelete)
      this.http.delete('tle/' + this.formTle.id).subscribe(
        (response) => {
          $('div#tleEditModal').modal('hide');
          this.getTle(this.formCategory.id);
        },
        (error) => this.showError(error)
      );

    this.confirmDelete = !this.confirmDelete;
  }

  saveTle(form) {
    this.formTle.category = this.formCategory.id;

    this.http.post('tle/', this.formTle).subscribe(
      (response) => {
        $('div#tleEditModal').modal('hide');
        this.getTle(this.formCategory.id);
        form.reset();
      },
      (error) => this.showError(error)
    );
  }

  toggleTle(tle: TLE) {
    let index = this.selectedTle.indexOf(this.selectedTle.filter((item) => { return item.name == tle.name })[0]);
    if (index >= 0)
      this.selectedTle.splice(index, 1);
    else
      this.selectedTle.push(tle);
  }

  execSearch(value: string) {
    if (value.length > 0)
      this.http.post('tle/search/', { name: value }).subscribe(
        (response) => {
          this.searchResults = new Category(0, 'Search: ' + '"' + value + '"', undefined);
          this.category = this.searchResults;
          this.tleList = response as Array<TLE>;
        },
        (error) => this.showError(error)
      );
  }

  // util
  showError(error) {
    console.log(error);
    $('span#errorModalTitle').text(error.status + ' ' + error.statusText);
    $('div#errorModalBody').html(error.error);
    $('div#errorModal').modal('show');
  }

}
