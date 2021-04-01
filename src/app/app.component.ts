import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'COVID-self-register-app';

  people = [

    {
      id:123445153124,
      name:'tomi',
      phone:7787133311,
      place:'metrotown',
      date: (new Date()).getTime(),
      notes:'nothing yet'
    },
    {
      id:132435123512,
      name:'vivian',
      phone:7787133311,
      place:'richmond',
      date: (new Date()).getTime(),
      notes:'nothing yet'
    },
    {
      id:132513251325,
      name:'bill',
      phone:7787133311,
      place:'downtown',
      date: (new Date()).getTime(),
      notes:'nothing yet'
    },
  ]

  handleNewReportButton(id){
    console.log('received report button at app component.',id);
  }

  handleInfoButton(id){
    console.log('received info event at app component.',id);
  }

  handleRemoveButton(id){
    console.log('received info event at app component.',id);
  }
  
}
