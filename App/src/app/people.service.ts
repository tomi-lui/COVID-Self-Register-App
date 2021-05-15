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
  // people

  // Data for testing without server:
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
      {
        id:(new Date()).getTime(),
        name:"Peter",
        phone:7783181699,
        place:"Downtown",
        date:(new Date()).getTime(),
        notes:"blah",
        position:{lat: 49.2887, lng: -123.1112}
      },
      {
        id:(new Date()).getTime(),
        name:"Vivian",
        phone:7783181699,
        place:"UBC",
        date:(new Date()).getTime(),
        notes:"Wear Masks!",
        position:{lat: 49.2606, lng: -123.2460}
      }
  ]

  constructor(private http: HttpClient, private router: Router) {
  }

  getPeople(){
    return this.people
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


  async httpDelete(key:number): Promise<Boolean>{
    var successful = false
    this.http.delete(this.URL + key,
    {observe:'response'}
    ).subscribe(
      data => {
        if (data){
          console.log(data);
          successful = true
        }
      }
    )
    console.log(`Key of ${key} deleted.`);
    return successful
  }


  httpGetData(): Observable<any> {
    return this.http.get<any>(this.URL)
  }


  refreshPage():void {
    window.location.reload()
  }

}