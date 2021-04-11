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
  //     {
  //       id:(new Date()).getTime(),
  //       name:"Peter",
  //       phone:7783181699,
  //       place:"Metrotown",
  //       date:(new Date()).getTime(),
  //       notes:"blah",
  //       position:{lat: 49.2276, lng: -123.0076}
  //     }
  // ]

  constructor(private http: HttpClient) {
    // this.httpPost(this.people[3])
  }


  ngOnInit(){
  }


  httpGetAll(): Array<any>{
    // Gets all the data from the database

    var allData = []
    var filteredData = []
    var counts = {}
    var place = []
    var places


    this.http.get<any>(this.URL).subscribe(

      (data) => {

        // console.log("very first data:",data);
        
        Object.keys(data).forEach( key => {
          // Count the number cases per location, store it in counts

          var element = data[key]["data"]
          counts[element["place"]] = counts[element["place"]] ? counts[element["place"]] + 1 : 1
        })
        
        
        Object.keys(data).forEach(key => {
          allData.push(data[key])
          filteredData.push(data[key]["data"])

        });


        Object.keys(data).forEach( key => {
          // push an object containing only place, position and counts

          var person = data[key]["data"]
          // console.log("person",person);
          
          const placeInformation = {}
          placeInformation["place"] = person.place
          placeInformation["position"] = person.position
          placeInformation["count"] = counts[person.place]
            
          place.push(placeInformation)

        })

        
        place = place.filter( placeInfo => {
          // console.log("placeInfo",placeInfo);
          
          var tempPlacesCount = {}
          tempPlacesCount[placeInfo.place] = tempPlacesCount[placeInfo.place] ? tempPlacesCount[placeInfo] + 1 : 1;
          if (tempPlacesCount[placeInfo.place] == 1) {
            return placeInfo
          }
        })

        places = place
        // console.log("counts",counts);
        // console.log("place",place);
      }
    )

    // console.log("allData",allData);
    // console.log("filteredData", filteredData);
    // console.log("place",place);
    // console.log("places",places);
    
    
    return [allData, filteredData, place]
  }




  extractPlacesFromPeople(peopleList){

    var counts = {}

    //count the instances of places and store it.
    
    Object.keys(peopleList).forEach((key) => {
      console.log("inside the counting loop",peopleList[key]["place"]);
      
      counts[peopleList[key]["place"]] = counts[peopleList[key]["place"]] ? counts[peopleList[key]["place"]] + 1 : 1;
    });

    var place: Array<any>;
    //reduce array of objects so that there is only a single instace of place and add the counts attribute to it.
    Object.keys(peopleList).forEach((key) => {
      const placeInformation = {}
      placeInformation["place"] = peopleList[key]["place"]
      placeInformation["position"] = peopleList[key]["position"]
      placeInformation["count"] = peopleList[key]["count"]
      place.push(placeInformation)
    })

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



  httpPost(newPerson){
    this.http.post<any>(this.URL, {
      "key": (new Date()).getTime(),
      "data": newPerson
    },
    {observe:'response'}
    ).subscribe(
      (data) => {
        console.log("HttpPost",data);
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
    
    return people
  }
  

  getPlaces(){
    var places = this.httpGetAll()[2]
    return places
  }

  add(newPerson){
    // this.people.push(newPerson)
    // return newPerson
  }

  delete(){

  }


}