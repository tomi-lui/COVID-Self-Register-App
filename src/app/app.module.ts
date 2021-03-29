import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';
import { NewReportButtonComponent } from './new-report-button/new-report-button.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TableComponent,
    NewReportButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
