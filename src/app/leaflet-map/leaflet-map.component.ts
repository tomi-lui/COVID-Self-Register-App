import { Component, OnInit, AfterViewInit, ViewEncapsulation, Input,NgZone } from '@angular/core';
import * as L from 'leaflet'
import { PeopleService } from '../people.service';
import { Observable } from 'rxjs'


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
  // encapsulation: ViewEncapsulation.None
})


export class LeafletMapComponent implements OnInit, AfterViewInit {

  // @Input() places //contains the cordinates, place name, cases reported
  places
  private map; //leaflet map
  markerObjects; //this list will store leaflet marker objects

  constructor(private ps: PeopleService, private NgZone: NgZone) { }



  ngAfterViewInit(): void { 

    console.log(this.markerObjects);
    console.log(this.places);
    
     
    this.map = L.map('mapid').setView([49.2, -123], 11);

    //create a leaflet map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG9taTEyMjEiLCJhIjoiY2tuM3JhazZ1MWs3ZTJxbzh2dTRoN2ZrZiJ9.OSRzhXZkyduJYpHdgqXd9Q', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);


    // this.convertToMarkerObject()
    // console.log(this.places);
    
     
    //dynamically update markers from the markerObjects list
    this.markerObjects.map( location => {
      console.log("hihi");
      
      L.marker(location.location).addTo(this.map)
     .bindPopup(location.description).openPopup()

    })


    //Examples of hard coded markers:
    // L.marker([49.2276, -123.0076]).addTo(this.map)
    // .bindPopup("<b>Metrotown</b><br />cases reported.").openPopup();

    // L.marker([49.1867, -122.8490]).addTo(this.map)
    // .bindPopup("<b>SFU Surrey</b><br />cases reported.").openPopup();

  }


  convertToMarkerObject(){
    //generate marker objects which contains dynamic strings informing the number of cases reported
    this.markerObjects = this.places.map( placesInfo => {
      // console.log(this.places);
      
      //create temporary object
      var markerFriendlyObject = {}

      markerFriendlyObject["location"] = [placesInfo["position"]["lat"], placesInfo["position"]["lng"]]
      markerFriendlyObject["description"] = `<b>${placesInfo["place"]}</b><br />${placesInfo["count"]} cases reported.`
      return markerFriendlyObject
    })
  }


  ngOnInit(): void {

    // this.ps.httpGetDataTest()
    
    // this.ps.httpGetData().subscribe( unfilteredData => {

    //   var data: Array<Object> = []
    //   unfilteredData.forEach(element => {
    //     var temp = {}
    //     temp = element.data
    //     data.push(temp)
    //   });

    //   // console.log(data); //filtering successful
      
    //   // returns an array of objects containing information of each place  
    //   var counts = {}
    //   var place = []

    //   data.forEach(element => {
    //     // console.log(element["place"]);
    //     counts[element["place"]] = counts[element["place"]] ? counts[element["place"]] + 1 : 1;
    //   });

    //   // console.log(counts); // working

    //   data.forEach(element => {
    //     const placeInformation = {}
    //     placeInformation["place"] = data["place"]
    //     placeInformation["position"] = data["position"]
    //     placeInformation["count"] = counts[element["place"]]
    //     place.push(placeInformation)
    //   });

    //   // remove duplicates
    //   var tempPlacesCount = {}
    //   place = data.filter( placeInfo => {
        
    //     tempPlacesCount[placeInfo["place"]] = tempPlacesCount[placeInfo["place"]] ? tempPlacesCount[placeInfo["place"]] + 1 : 1;
    //     if (tempPlacesCount[placeInfo["place"]] == 1) {
    //       placeInfo["count"] = counts[placeInfo["place"]]
    //       return placeInfo
    //     }
    //   })
    //   // console.log(place); //working
      
    //   this.places = place
    //   // console.log(this.places); //working

    //   this.convertToMarkerObject()
    //   console.log(this.markerObjects); //working
      
    // })

    this.NgZone.run( () => {
        
    this.ps.httpGetData().subscribe( unfilteredData => {

      var data: Array<Object> = []
      unfilteredData.forEach(element => {
        var temp = {}
        temp = element.data
        data.push(temp)
      });

      // console.log(data); //filtering successful
      
      // returns an array of objects containing information of each place  
      var counts = {}
      var place = []

      data.forEach(element => {
        // console.log(element["place"]);
        counts[element["place"]] = counts[element["place"]] ? counts[element["place"]] + 1 : 1;
      });

      // console.log(counts); // working

      data.forEach(element => {
        const placeInformation = {}
        placeInformation["place"] = data["place"]
        placeInformation["position"] = data["position"]
        placeInformation["count"] = counts[element["place"]]
        place.push(placeInformation)
      });

      // remove duplicates
      var tempPlacesCount = {}
      place = data.filter( placeInfo => {
        
        tempPlacesCount[placeInfo["place"]] = tempPlacesCount[placeInfo["place"]] ? tempPlacesCount[placeInfo["place"]] + 1 : 1;
        if (tempPlacesCount[placeInfo["place"]] == 1) {
          placeInfo["count"] = counts[placeInfo["place"]]
          return placeInfo
        }
      })
      // console.log(place); //working
      
      this.places = place
      // console.log(this.places); //working

      this.convertToMarkerObject()
      console.log(this.markerObjects); //working
      
    })




    })
  }
}