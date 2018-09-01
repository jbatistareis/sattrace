import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SatelliteListComponent } from './satellite-list/satellite-list.component';
import { SatelliteMapComponent } from './satellite-map/satellite-map.component';
import { RootComponent } from './root/root.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SatelliteListComponent,
    SatelliteMapComponent,
    RootComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
