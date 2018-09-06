import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TLE } from './tle-list/tle';

@Injectable({
  providedIn: 'root'
})
export class TleTrackService {

  public tleList: TLE[] = [];

  @Output() toggleTle: EventEmitter<TLE> = new EventEmitter();
  @Output() updatedTle: EventEmitter<TLE> = new EventEmitter();

  constructor(private http: HttpClient) { }

  updateTles() {
    if (this.tleList.length > 0) {
      let tleIds = [];
      for (let i = 0; i < this.tleList.length; i++)
        tleIds.push(this.tleList[i].id);

      this.http.get('tle/', { params: { id: tleIds } }).subscribe(
        (response) => {
          for (let i = 0; i < (response as TLE[]).length; i++)
            this.updatedTle.next((response as TLE[])[i]);
        },
        (error) => console.log(error)
      );
    }
  }

  toggle(tle: TLE) {
    let index = this.tleList.indexOf(this.tleList.filter((item) => { return item.id === tle.id })[0]);
    if (index >= 0) {
      this.tleList.splice(index, 1);
    }
    else {
      tle.color = 'rgb(' + Math.floor(Math.random() * 240) + ',' + Math.floor(Math.random() * 240) + ',' + Math.floor(Math.random() * 240) + ')';
      this.tleList.push(tle);
    }

    this.toggleTle.next(tle);
  }
}
