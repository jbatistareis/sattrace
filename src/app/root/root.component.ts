import { Component, OnInit } from '@angular/core';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  public spinkit = Spinkit;

  constructor() { }

  ngOnInit() {
  }

}
