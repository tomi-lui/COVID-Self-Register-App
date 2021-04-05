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

  private map

  private formLocation

  constructor() { }

  ngAfterViewInit(): void { 
    this.map = L.map('formmapid').setView([49.2, -123], 11);


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    var marker = L.marker([49.2276, -123.0076],{draggable:true}).on('dragend', e => {

      //set new marker location cordinates to the formLocation variable
      this.formLocation = marker.getLatLng()
      console.log(this.formLocation);
    })
    .addTo(this.map)
    .bindPopup("<b>Drag Me to</b><br /><b>your Location!</b>").openPopup()



  }
  ngOnInit(): void {
  }

  getValues(val){
    console.log(val);
    
  }

}
