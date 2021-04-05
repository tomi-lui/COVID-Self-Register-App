import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';
import { NewReportButtonComponent } from './new-report-button/new-report-button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { FormPageComponent } from './form-page/form-page.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TableComponent,
    NewReportButtonComponent,
    LeafletMapComponent,
    FormPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
