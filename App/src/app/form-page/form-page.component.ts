import { AfterViewInit, Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
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
//


@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit,AfterViewInit {

  @Output() newPerson = new EventEmitter()
  @Output() displayHomePage = new EventEmitter()
  @Input() placesInput

  private map; //leaflet map
  public newLocation = {lat:'Please move the marker',lng:'Please move the marker'}; //store new location
  public addNewLocation = true;


  //handle select date, create model for select date input
  public model:any = {};
  public selectedDate:Date;
  public dateWording:string = "yyyy-mm-dd";
  public currentDateObj:any = {};


  constructor(private ps:PeopleService) { }

  ngAfterViewInit(): void { 
    //Make Leaflet Map work
    this.map = L.map('formmapid').setView([49.22593533950, -123.00730229277266], 10);

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
    .bindPopup("<b>Drag Me to</b><br /><b>to the place</b><br><b>you visited!</b>").openPopup()

    //initiate lat lng for new location
    this.newLocation = {lat:marker.getLatLng().lat,lng:marker.getLatLng().lng}

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

    if (this.addNewLocation) { 
    //check if user wants to add a new location, or select from existing location

      if (val.newPlace == "") { //Error handling
        return alert("Please enter a new place name.")

      } else { 
        //If no errors, continue to update new person (with new location) to database
        this.addNewPerson({
          name:val.name,
          phone:val.phone,
          date:this.selectedDate,
          place:val.newPlace,
          position: this.newLocation,
          notes: val.notes
        })
        //return to homepage after submission
        this.ps.refreshPage()
      }

    } else {  
      //Get the cordinate location for the selected cordinate name
      const location = (this.placesInput.filter( (value) => {
           return value.place == val.place
        })
      )

      //Continue to update new person (with existing location) to database
      this.addNewPerson({
        name:val.name,
        phone:val.phone,
        date:this.selectedDate,
        place:val.place,
        position: location[0].position,
        notes:val.notes
      })

      //Return to homepage after submition
      this.ps.refreshPage()
    }
  }

  addNewPerson(person):void {
    //pass object to APP component
    this.newPerson.emit(person)
  }

  handleAddNewLocationButton(): void{
    //capture wether or not user wants to add new person
    if (this.addNewLocation == true){
      this.addNewLocation = false
    } else {
      this.addNewLocation = true
    }
    console.log(this.addNewLocation);
    
  }

  onSelect(evt): void{
    //get the date input from the form
    this.selectedDate = new Date(evt.year,evt.month-1,evt.day);
    console.log(this.selectedDate.getTime());
  }

  handleDisplayHomePage(){
    this.displayHomePage.emit()
  }
}
