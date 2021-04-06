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
      name:'Tomi',
      phone:7787133311,
      place:'Metrotown',
      date: (new Date()).getTime(),
      notes:'I dont know what to write here ',
      position:{lat: 49.2276, lng: -123.0076}
    },
    {
      id:132435123512,
      name:'Jack',
      phone:7787133311,
      place:'Surrey',
      date: (new Date()).getTime(),
      notes:'Bhahahah this is working',
      position:{lat: 49.1867, lng: -122.8490}
    },
    {
      id:132513251325,
      name:'Bill',
      phone:7787133311,
      place:'Metrotown',
      date: (new Date()).getTime(),
      notes:'nothing yet',
      position:{lat: 49.2276, lng: -123.0076}
    },
  ]

  places = [
    {
      place:'Metrotown',position:{lat: 49.2276, lng: -123.0076}
    },
    {
      place:'Surrey',position:{lat: 49.1867, lng: -122.8490}
    }
  ]

  counts = {}


  extractPlacesFromPeople(peopleList){
    //This function returns a list of object with place, position, and count
    //to pass down to the leaflet-map component to display markers.

    //count the instances of places and store it.
    peopleList.forEach((element) => {
      this.counts[element.place] = this.counts[element.place] ? this.counts[element.place] + 1 : 1;
    });

    //reduce array of objects so that there is only a single instace of place and add the counts attribute to it.
    var placeArray = peopleList.map((person) => {
      const placeInformation = {}
      placeInformation["place"] = person.place
      placeInformation["position"] = person.position
      placeInformation["count"] = this.counts[person.place]
      return placeInformation
    })

    // remove duplicates
    var tempPlacesCount = {}
    placeArray = placeArray.filter( placeInfo => {
      tempPlacesCount[placeInfo.place] = tempPlacesCount[placeInfo.place] ? tempPlacesCount[placeInfo] + 1 : 1;
      if (tempPlacesCount[placeInfo.place] == 1) {
        return placeInfo
      }
    })

    console.log(this.counts);
    console.log(placeArray);
    
    return placeArray
  }

  

  handleNewReportButton(event){
    console.log('received report button at app component.',event);
    this.extractPlacesFromPeople(this.people)
  }

  handleInfoButton(id){
    console.log('received info event at app component.',id);
  }

  handleRemoveButton(id){
    console.log('received info event at app component.',id);
  }

  handleAddNewPerson(person){
    console.log("received from app component, at handleAddNewPerson.",person)
  }
  
}
