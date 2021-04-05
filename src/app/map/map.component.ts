import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { google } from 'google-maps'
import MarkerClusterer from '@googlemaps/markerclustererplus'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('gmap') gmapElement;
    map: google.maps.Map;
    
    locations = [
      {
        label:'first label',
        position:{lat: 49.2276, lng: -123.0076}
      },
      {
        label:"second label",
        position:{lat: 49.1867, lng: -122.8490}
      },
      {
        label:'overlapping',
        position:{lat: 49.2276, lng: -123.0076}
      },
      {
        label:'second surrey one',
        position:{lat: 49.1867, lng: -122.8400}
      }
    ]

    ngAfterViewInit(){

        //initiate center point of the map
        var mapCenter = new google.maps.LatLng(49.2,-123)

        var mapProp = {
          center: mapCenter,
          zoom:11,
        }

        this.map = new google.maps.Map(this.gmapElement.nativeElement,mapProp)

        const markers = this.locations.map((location, i) => {
          return new google.maps.Marker({
            position:location.position,
            label:location.label
          })
        })

        const markerCluster = new MarkerClusterer(this.map, markers, {
          imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
        })
        
        // function editTitle (markers, numStyles){
        //     //create an index for icon styles
        //     var index = 0,
        //     //Count the total number of markers in this cluster
        //         count = markers.length,
        //     //Set total to loop through (starts at total number)
        //         total = count;

        //     /**
        //      * While we still have markers, divide by a set number and
        //      * increase the index. Cluster moves up to a new style.
        //      *
        //      * The bigger the index, the more markers the cluster contains,
        //      * so the bigger the cluster.
        //      */
        //     while (total !== 0) {
        //         //Create a new total by dividing by a set number
        //         total = parseInt(total / 5, 10);
        //         //Increase the index and move up to the next style
        //         index++;
        //     }

        //     /**
        //      * Make sure we always return a valid index. E.g. If we only have
        //      * 5 styles, but the index is 8, this will make sure we return
        //      * 5. Returning an index of 8 wouldn't have a marker style.
        //      */
        //     index = Math.min(index, numStyles);

        //     //Tell MarkerCluster this clusters details (and how to style it)
        //     return {
        //         text: markers[0].label,
        //         index: index
        //     };
        // }

        

         


        
        

        // const marker = new google.maps.Marker({
        //   position: {lat: 49.2276, lng: -123.0076},
        //   map: this.map,
        //   label: { fontWeight: 'bold', fontSize: '12px', text: 'permanent text' }
        // })

        // const marker2 = new google.maps.Marker({
        //   position: {lat: 49.1867, lng: -122.8490},
        //   map: this.map,
        //   title: 'hovering label'
        // })

    }

  constructor() { }

  ngOnInit(): void {
  }

}