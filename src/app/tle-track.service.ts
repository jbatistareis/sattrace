import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TLE } from './tle-list/tle';

@Injectable({
  providedIn: 'root'
})
export class TleTrackService {

  @Output() toggleTle: EventEmitter<TLE> = new EventEmitter();

  constructor() { }

  toggle(tle: TLE) {
    this.toggleTle.next(tle);
  }
}
