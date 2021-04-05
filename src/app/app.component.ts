/// <referenece <reference types="@types/googlemaps" />
import { Component,ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'COVID-self-register-app';

  constructor(private router:Router){}

  people = [

    {
      id:123445153124,
      name:'tomi',
      phone:7787133311,
      place:'metrotown',
      date: (new Date()).getTime(),
      notes:'I dont know what to write here '
    },
    {
      id:132435123512,
      name:'Jack',
      phone:7787133311,
      place:'richmond',
      date: (new Date()).getTime(),
      notes:'Bhahahah this is working'
    },
    {
      id:132513251325,
      name:'bill',
      phone:7787133311,
      place:'downtown',
      date: (new Date()).getTime(),
      notes:'nothing yet'
    },
  ]

  handleNewReportButton(event){
    console.log('received report button at app component.',event);
    this.router.navigate(['Form'])
  }

  handleInfoButton(id){
    console.log('received info event at app component.',id);
  }

  handleRemoveButton(id){
    console.log('received info event at app component.',id);
  }
  
}
