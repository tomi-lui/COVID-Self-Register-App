/// <referenece <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service'
import { Person } from './Person'

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
  constructor(private ps: PeopleService){}

  async ngOnInit() {
    // these functions are used when this app is connected to a database
    // const allData = await this.ps.httpGetData().toPromise()
    // this.extractObjectsFromAllData(allData)
    // this.places = this.extractPlacesFromPeople(this.people)

    this.people = this.ps.getPeople()
    this.places = this.extractPlacesFromPeople(this.people)
    console.log(this.places);
    
  }

  extractObjectsFromAllData(allData): void{
      var people = []
      allData.forEach(element => {
        var temp = {}
        temp = element.data
        people.push(temp)
      });
      this.people = people
  }

  extractPlacesFromPeople(peopleList){
    //This function returns a list of object with place, position, and count
    //to pass down to the form component.

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
    var setOfPlaces = new Set()
    placeArray = placeArray.filter( placeInfo => {
      if(setOfPlaces.has(placeInfo.place)){
        return
      } else {
        setOfPlaces.add(placeInfo.place)
        return placeInfo
      }
    })

    return placeArray
  }


  handleNewReportButton(event){
    console.log('received report button at app component.',event);
    this.displayForm = true
  }

  async handleRemoveButton(id:number): Promise<void>{
    console.log('received info event at app component.',id);
    await this.ps.httpDelete(id)
    this.ps.refreshPage()
  }

  async handleAddNewPerson(person): Promise<void>{
    console.log("received from app component, at handleAddNewPerson.",person)
    await this.ps.httpPost(person)
  }
  
  displayHomePage(){
    this.displayForm = false
  }

}
