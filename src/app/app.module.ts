import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TleListComponent } from './tle-list/tle-list.component';
import { SatelliteMapComponent } from './satellite-map/satellite-map.component';
import { RootComponent } from './root/root.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    TleListComponent,
    SatelliteMapComponent,
    RootComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgHttpLoaderModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
