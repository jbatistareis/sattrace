import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SatelliteListComponent } from './satellite-list/satellite-list.component';
import { SatelliteMapComponent } from './satellite-map/satellite-map.component';
import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [
    SatelliteListComponent,
    SatelliteMapComponent,
    RootComponent],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
