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
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { PeopleService } from './people.service';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TableComponent,
    NewReportButtonComponent,
    LeafletMapComponent,
    FormPageComponent,
    SortPipe,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
