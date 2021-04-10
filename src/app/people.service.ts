import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleService implements OnInit {
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

  places = this.extractPlacesFromPeople(this.people)

  constructor() { }

  ngOnInit(){
    // this.places = this.extractPlacesFromPeople(this.people)
  }

  extractPlacesFromPeople(peopleList){
    //This function returns a list of object with place, position, and covid case count
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

  getPeople(){
    return this.people
  }

  getPlaces(){
    console.log(this.places);
    return this.places
  }

  add(newPerson){
    this.people.push(newPerson)
    return newPerson
  }

  delete(){

  }
}
