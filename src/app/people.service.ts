import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class PeopleService implements OnInit {


  URL = "https://218.selfip.net/apps/AInYTcCKgz/collections/people/documents/"
  allData
  people

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

  constructor(private http: HttpClient, private router: Router) {
  }


  ngOnInit(){
  }

  httpGetAll():void{
    // Gets all the data from the server

    this.http.get<any>(this.URL).subscribe(

      (data) => {
        this.allData = data
        console.log(this.allData);
      }
    )
    // console.log(this.allData);
  }

  

  removeKeysFromAllData(allData): void {
    // returns an array containing data only (without the keys)
    var people = []
    allData.forEach(element => {
      var temp = {}
      temp = element.data
      people.push(temp)
    });
    this.people = people
  }

  extractPlacesFromPeople(peopleList){
    // returns an array of objects containing information of each place  
    var counts = {}
    var place = []

    //count the instances of places and store it.
    
    // Object.keys(peopleList).forEach((key) => {
    //   console.log("inside the counting loop",peopleList[key]["place"]);
      
    //   counts[peopleList[key]["place"]] = counts[peopleList[key]["place"]] ? counts[peopleList[key]["place"]] + 1 : 1;
    // });

    peopleList.forEach(element => {
      counts[element.place] = counts[element.place] ? counts[element.place] + 1 : 1;
    });

    // var place: Array<any>;
    // //reduce array of objects so that there is only a single instace of place and add the counts attribute to it.
    // Object.keys(peopleList).forEach((key) => {
    //   const placeInformation = {}
    //   placeInformation["place"] = peopleList[key]["place"]
    //   placeInformation["position"] = peopleList[key]["position"]
    //   placeInformation["count"] = peopleList[key]["count"]
    //   place.push(placeInformation)
    // })

    peopleList.forEach(element => {
      const placeInformation = {}
      placeInformation["place"] = peopleList.place
      placeInformation["position"] = peopleList.position
      placeInformation["count"] = counts[element.place]
      place.push(placeInformation)
    });


    // // remove duplicates
    // var tempPlacesCount = {}
    // place = place.filter( placeInfo => {
    //   tempPlacesCount[placeInfo.place] = tempPlacesCount[placeInfo.place] ? tempPlacesCount[placeInfo] + 1 : 1;
    //   if (tempPlacesCount[placeInfo.place] == 1) {
    //     return placeInfo
    //   }
    // })


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


  async httpPost(newPerson): Promise<void>{
    newPerson["id"] = (new Date()).getTime()

    this.http.post<any>(this.URL, {
      "key": (new Date()).getTime(),
      "data": newPerson
    },
    {observe:'response'}
    ).subscribe(
      (data) => {
        return data
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


  httpGetData() {
    return this.http.get<any>(this.URL)
  }
  
  // httpGetDataTest() {
  //   return this.http.get<any>(this.URL).pipe(
  //     map( element => {

  //     })
  //   )
  // }

  getPlaces(){
    return this.extractPlacesFromPeople(this.people)
  }


  add(newPerson){
    // this.people.push(newPerson)
    // return newPerson
  }

  delete(){

  }

  httpGetDataTest(): Observable<any>{
    var res = this.http.get(this.URL).pipe(map( d => this.modify(d)))
    console.log(res);
    return res
    
  }

  modify(data){
    console.log(data);
    return data.data
  }

  refreshPage():void {
    window.location.reload()
  }

}