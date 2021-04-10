import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PeopleService implements OnInit {


  URL = "https://218.selfip.net/apps/AInYTcCKgz/collections/people/documents/"


  // people = this.httpGetAll()
  // places = this.extractPlacesFromPeople(this.people)
  // people = [

  //     {
  //       id:123445153124,
  //       name:'Tomi',
  //       phone:7787133311,
  //       place:'Metrotown',
  //       date: (new Date()).getTime(),
  //       notes:'I dont know what to write here ',
  //       position:{lat: 49.2276, lng: -123.0076}
  //     },
  //     {
  //       id:132435123512,
  //       name:'Jack',
  //       phone:7787133311,
  //       place:'Surrey',
  //       date: (new Date()).getTime(),
  //       notes:'Bhahahah this is working',
  //       position:{lat: 49.1867, lng: -122.8490}
  //     },
  //     {
  //       id:132513251325,
  //       name:'Bill',
  //       phone:7787133311,
  //       place:'Metrotown',
  //       date: (new Date()).getTime(),
  //       notes:'nothing yet',
  //       position:{lat: 49.2276, lng: -123.0076}
  //     },
  // ]

  constructor(private http: HttpClient) {}


  ngOnInit(){}


  httpGetAll(): Array<any>{
    // Gets all the data from the database

    var allData = []
    var filteredData = []
    this.http.get<Object>(this.URL).subscribe(
      (data) => {
        Object.keys(data).forEach(key => {
          allData.push(data[key])
          filteredData.push(data[key]["data"])
        });
      }
    )
    return [allData, filteredData]
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


  getPeople(): Array<any>{
    var data = this.httpGetAll()
    var people = data[1]
    console.log(people);
    
    return people
  }
  

  getPlaces(){
    var filteredData = this.httpGetAll()[1]
    var places = this.extractPlacesFromPeople(filteredData)
    console.log("getPlaces",places);
    return places
  }

  add(newPerson){
    // this.people.push(newPerson)
    // return newPerson
  }

  delete(){

  }

  extractPlacesFromPeople(peopleList){

    console.log("extractPlacesFromPeople", peopleList);


    //This function returns a list of object with place, position, and covid case count
    //to pass down to the leaflet-map component to display markers.

    var counts = {}

    //count the instances of places and store it.
    Object.keys(peopleList).forEach(key =>{
      console.log("key is: ",key);
    })

    peopleList.forEach(element => {
      console.log("element is:",element);
      
    });
    // Object.keys(peopleList).forEach((key) => {
    //   console.log("inside the counting loop",peopleList[key]["place"]);
      
    //   counts[peopleList[key]["place"]] = counts[peopleList[key]["place"]] ? counts[peopleList[key]["place"]] + 1 : 1;
    // });


    console.log("counts", counts);
    


    var place: Array<any>;
    //reduce array of objects so that there is only a single instace of place and add the counts attribute to it.
    Object.keys(peopleList).forEach((key) => {
      const placeInformation = {}
      placeInformation["place"] = peopleList[key]["place"]
      placeInformation["position"] = peopleList[key]["position"]
      placeInformation["count"] = peopleList[key]["count"]
      place.push(placeInformation)
    })

    console.log("place:",place);
    

    // remove duplicates
    var tempPlacesCount = {}
    place = place.filter( placeInfo => {
      tempPlacesCount[placeInfo.place] = tempPlacesCount[placeInfo.place] ? tempPlacesCount[placeInfo] + 1 : 1;
      if (tempPlacesCount[placeInfo.place] == 1) {
        return placeInfo
      }
    })

    return place
  }
}
