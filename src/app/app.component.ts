/// <referenece <reference types="@types/googlemaps" />
import { Component,ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PeopleService } from './people.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'COVID-self-register-app';
  displayForm = false
  people;
  places;
  constructor(private ps: PeopleService){

  }

  ngOnInit() {
    this.people = this.ps.getPeople()
    this.places = this.ps.getPlaces()
  }

  extractPlacesFromPeople(peopleList){
    //This function returns a list of object with place, position, and count
    //to pass down to the leaflet-map component to display markers.

    var counts = {}

    //count the instances of places and store it.
    peopleList.forEach((element) => {
      counts[element.place] = counts[element.place] ? counts[element.place] + 1 : 1;
    });

    //reduce array of objects so that there is only a single instace of place and add the counts attribute to it.
    var placeArray = peopleList.map((person) => {
      const placeInformation = {}
      placeInformation["place"] = person.place
      placeInformation["position"] = person.position
      placeInformation["count"] = counts[person.place]
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

    console.log(counts);
    console.log(placeArray);
    
    return placeArray
  }

  

  handleNewReportButton(event){
    console.log('received report button at app component.',event);
    this.displayForm = true
  }

  handleInfoButton(id){
    console.log('received info event at app component.',id);
  }

  handleRemoveButton(id){
    console.log('received info event at app component.',id);
  }

  handleAddNewPerson(person){
    console.log("received from app component, at handleAddNewPerson.",person)
    this.people.push(person)
    this.places = this.extractPlacesFromPeople(this.people)
  }
  
  displayHomePage(){
    this.displayForm = false
  }
}
