import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TleTrackService } from '../tle-track.service';
import { Category } from './category';
import { TLE } from './tle';

declare var $: any;

@Component({
  selector: 'app-tle-list',
  templateUrl: './tle-list.component.html',
  styleUrls: ['./tle-list.component.css']
})
export class TleListComponent implements OnInit {

  private confirmDelete: boolean = false;
  private importFile: File = undefined;

  public tleList: TLE[] = [];
  public categoryList: Category[] = [];
  public noCategory: Category = new Category(1, 'No category');
  public searchResults: Category = undefined;

  public selectedTle: TLE[] = [];
  public category: Category = this.noCategory;
  public formCategory: Category = new Category();
  public formTle: TLE = new TLE();
  public search: string = undefined;
  public filename: string = undefined;

  constructor(private http: HttpClient, private tleTrackService: TleTrackService) { }

  ngOnInit() {
    this.getCategories();
    this.loadCategoryData(this.noCategory);

    $('[data-toggle=popover]').popover();
    $('[data-toggle="tooltip"]').tooltip();
    $('div#categoryEditModal').on('show.bs.modal', (event) => { this.confirmDelete = false; });
    $('div#tleEditModal').on('show.bs.modal', (event) => { this.confirmDelete = false; });
    $('div#importModal').on('show.bs.modal', (event) => {
      this.filename = undefined;
      $('div#uploadResult').html('');
    });
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
      this.http.delete('category/' + this.formCategory.id, { responseType: 'text' }).subscribe(
        (response) => {
          $('div#categoryEditModal').modal('hide');
          this.getCategories();
          this.category = this.noCategory;
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
    $('div#catInfo').attr('data-original-title', category.description || 'No description');
  }

  // tle
  newTle() {
    this.formTle = new TLE();
  }

  getTle(categoryId: number) {
    if (categoryId > 0)
      this.http.get('tle/category/' + categoryId).subscribe(
        (response) => {
          this.searchResults = undefined;
          this.tleList = response as Array<TLE>;
        },
        (error) => this.showError(error)
      );
  }

  deleteTle() {
    if (this.confirmDelete)
      this.http.delete('tle/' + this.formTle.id, { responseType: 'text' }).subscribe(
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
    this.tleTrackService.toggle(tle);
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

  // upload
  setFile(event) {
    this.filename = event.target.files[0].name;
    this.importFile = event.target.files[0];
  }

  sendFile() {
    if (this.importFile) {
      let formData = new FormData();
      formData.append('file', this.importFile, this.importFile.name);

      this.http.post('tle/import/' + this.category.id, formData, { responseType: 'text' }).subscribe(
        (response) => {
          this.importFile = undefined;
          $('div#uploadResult').html(response);
          this.getTle(this.formCategory.id);
        },
        (error) => {
          this.importFile = undefined;
          $('div#uploadResult').html(error.error);
        }
      );
    }
  }

  // util
  showError(error) {
    console.log(error);
    $('span#errorModalTitle').text(error.status + ' ' + error.statusText);
    $('div#errorModalBody').html(error.error);
    $('div#errorModal').modal('show');
  }

}
