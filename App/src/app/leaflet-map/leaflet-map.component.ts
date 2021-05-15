import { Component, OnInit, AfterViewInit, ViewEncapsulation, Input,NgZone } from '@angular/core';
import * as L from 'leaflet'
import { PeopleService } from '../people.service';


// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;



@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css'],
  providers:[PeopleService]
})


export class LeafletMapComponent implements AfterViewInit {

  @Input() places //contains the cordinates, place name, cases reported
  // places
  allData
  private map; //leaflet map
  markerObjects; //this list will store leaflet marker objects
  people;
  constructor(private ps: PeopleService) {
  }



  async ngAfterViewInit(): Promise<void> { 


    // These funcitons are only run of app is connected to database
    // const res = await this.ps.httpGetData().toPromise()
    // this.convertToPlacesArray(res)

    // OFFLINE
    this.people = this.ps.getPeople()
    this.convertToPlacesArrayOFFLINE(this.people)

    // console.log(this.allData);
    
     
    this.map = L.map('mapid').setView([49.2453968, -123.0509688400], 11);

    //create a leaflet map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG9taTEyMjEiLCJhIjoiY2tuM3JhazZ1MWs3ZTJxbzh2dTRoN2ZrZiJ9.OSRzhXZkyduJYpHdgqXd9Q', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);


    this.convertToMarkerObject()
     
    //dynamically update markers from the markerObjects list
    this.markerObjects.map( location => {
      
      L.marker(location.location).addTo(this.map)
     .bindPopup(location.description).openPopup()

    })

    // For Testing
    //Examples of hard coded markers:
    // L.marker([49.2276, -123.0076]).addTo(this.map)
    // .bindPopup("<b>Metrotown</b><br />cases reported.").openPopup();

    // L.marker([49.1867, -122.8490]).addTo(this.map)
    // .bindPopup("<b>SFU Surrey</b><br />cases reported.").openPopup();

  }


  convertToMarkerObject(): void{
    //generate marker objects which contains dynamic strings informing the number of cases reported
    this.markerObjects = this.places.map( placesInfo => {
      
      //create temporary object
      var markerFriendlyObject = {}

      markerFriendlyObject["location"] = [placesInfo["position"]["lat"], placesInfo["position"]["lng"]]
      markerFriendlyObject["description"] = `<b>${placesInfo["place"]}</b><br />${placesInfo["count"]} case(s) reported.`
      return markerFriendlyObject
    })
  }

  convertToPlacesArray(allData): void{
    // create an array containing the number of instances of each place reported

    var dataOnly = []
    allData.forEach(element => {
        
        var temp = {}
        temp = element.data
        dataOnly.push(temp)
    });
  
    var counts = {}
    var place = []

    dataOnly.forEach(element => {
        // console.log(element["place"]);
        counts[element["place"]] = counts[element["place"]] ? counts[element["place"]] + 1 : 1;
    })

    dataOnly.forEach(element => {
        const placeInformation = {}
        placeInformation["place"] = dataOnly["place"]
        placeInformation["position"] = dataOnly["position"]
        placeInformation["count"] = counts[element["place"]]
        place.push(placeInformation)
    });

    // remove duplicates
    var tempPlacesCount = {}
    place = dataOnly.filter( placeInfo => {
      
      tempPlacesCount[placeInfo["place"]] = tempPlacesCount[placeInfo["place"]] ? tempPlacesCount[placeInfo["place"]] + 1 : 1;
      if (tempPlacesCount[placeInfo["place"]] == 1) {
        placeInfo["count"] = counts[placeInfo["place"]]
        return placeInfo
      }
    })
    
    this.places = place
    }

  convertToPlacesArrayOFFLINE(allData): void{
    // create an array containing the number of instances of each place reported
    console.log(allData);
    
    const dataOnly = allData 
    var counts = {}
    var place = []

    dataOnly.forEach(element => {
        // console.log(element["place"]);
        counts[element["place"]] = counts[element["place"]] ? counts[element["place"]] + 1 : 1;
    })

    dataOnly.forEach(element => {
        const placeInformation = {}
        placeInformation["place"] = dataOnly["place"]
        placeInformation["position"] = dataOnly["position"]
        placeInformation["count"] = counts[element["place"]]
        place.push(placeInformation)
    });

    // remove duplicates
    var tempPlacesCount = {}
    place = dataOnly.filter( placeInfo => {
      
      tempPlacesCount[placeInfo["place"]] = tempPlacesCount[placeInfo["place"]] ? tempPlacesCount[placeInfo["place"]] + 1 : 1;
      if (tempPlacesCount[placeInfo["place"]] == 1) {
        placeInfo["count"] = counts[placeInfo["place"]]
        return placeInfo
      }
    })
    
    this.places = place
    console.log(this.places);
    
    }
}