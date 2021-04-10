import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PeopleService implements OnInit {
  URL = "https://218.selfip.net/apps/AInYTcCKgz/collections/people/documents/"
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

  constructor(private http: HttpClient) { 
    this.httpGetAll()
  }

  ngOnInit(){
    console.log("oninit called");
    // this.httpGetAll() 
  }


  httpGetAll(){
    this.http.get<Object>(this.URL).subscribe(
      (data) => {
        console.log(data);
        
      }
    )
  }


  httpPost(newPerson){
    this.http.post<Object>(this.URL, {
      "key": (new Date()).getTime(),
      "data": newPerson
    }).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }


  httpDelete(key:string){
    this.http.delete(this.URL + key,
    {observe:'response'}
    ).subscribe(
      data => {        
      }
    )
    console.log(`Key of ${key} deleted.`);
  }


  getPeople(){
    return this.people
  }
  

  getPlaces(){
    return this.places
  }

  add(newPerson){
    this.people.push(newPerson)
    return newPerson
  }

  delete(){

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

    return placeArray
  }
}
