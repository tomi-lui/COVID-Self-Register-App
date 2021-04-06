import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet'


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
//


@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit,AfterViewInit {

  private map;

  public newLocation = {lat:'Please move the marker',lng:'Please move the marker'};

  public addNewLocation = true;

  public places = [
    {
      place:'Metrotown',position:{lat: 49.2276, lng: -123.0076}
    },
    {
      place:'Surrey',position:{lat: 49.1867, lng: -122.8490}
    }
  ]


  //handle select date
  public model:any = {};
  public selectedDate:Date;
  public dateWording:string = "yyyy-mm-dd";
  public currentDateObj:any = {};


  constructor() { }

  ngAfterViewInit(): void { 
    this.map = L.map('formmapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG9taTEyMjEiLCJhIjoiY2tuM3JhazZ1MWs3ZTJxbzh2dTRoN2ZrZiJ9.OSRzhXZkyduJYpHdgqXd9Q', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    var marker = L.marker([49.2276, -123.0076],{draggable:true}).on('dragend', e => {

      //set new marker location cordinates to the formLocation variable
      this.newLocation = {lat:marker.getLatLng().lat,lng:marker.getLatLng().lng}
      console.log(this.newLocation);
      
    })
    .addTo(this.map)
    .bindPopup("<b>Drag Me to</b><br /><b>your Location!</b>").openPopup()

    //initiate lat lng for new location
    this.newLocation = {lat:marker.getLatLng().lat,lng:marker.getLatLng().lng}

    this.refreshTiles() 

  }
  ngOnInit(): void {
  }

  getValues(val){
    //Handle Errors
    console.log("values from getValues().",val);

    if (val.name == "") {
      return alert('Please enter a valid name.')
    }
    
    //Check if phone number contains any alphabet characters
    var regExp = /[a-zA-Z]/g
    if (val.phone == "" || regExp.test(val.phone)) {
      return alert('Please enter a valid phone number.')
    }

    if (!this.selectedDate) {
      return alert('Please pick a date from the drop down calendar.')
    }

    if (this.addNewLocation) { //check if user wants to add a new location, or select from existing location

      if (val.newPlace == "") { //Error handling
        return alert("Please enter a new place name.")

      } else { //If no errors, continue to update new person (with new location) to database

        this.addNewPerson({
          name:val.name,
          phone:val.phone,
          date:this.selectedDate,
          place:val.newPlace,
          position: this.newLocation
        })
      }
    } else {  
      //Get the cordinate location for the selected cordinate name
      const location = (this.places.filter( (value) => {
           return value.place == val.place
        })
      )

      //Continue to update new person (with existing location) to database
      this.addNewPerson({
        name:val.name,
        phone:val.phone,
        date:this.selectedDate,
        place:val.place,
        position: location[0].position
      })
    }
  }

  addNewPerson(person){
    console.log("Values from addNewPerson.",person);
    
  }

  handleAddNewLocationButton(){
    if (this.addNewLocation == true){
      this.addNewLocation = false
    } else {
      this.addNewLocation = true
    }
    console.log(this.addNewLocation);
    
  }

  onSelect(evt){
    this.selectedDate = new Date(evt.year,evt.month-1,evt.day);
    console.log(this.selectedDate.getTime());
  }

  refreshTiles(){
    setInterval(() => {
      L.invaliddateSize(true)
    })
  }
  
}
