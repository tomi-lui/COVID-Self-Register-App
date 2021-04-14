import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { PeopleService } from '../people.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  // @Input() peopleInput
  people
  @Output() infoId = new EventEmitter()
  @Output() removeId = new EventEmitter()

  constructor(private ps: PeopleService) { 
  }

  ngOnInit(): void {
    //retrieve data, extract the "data" from each object and set it to the people variable
    this.ps.httpGetData().subscribe( data => {
      var people = []
      data.forEach(element => {
        var temp = {}
        temp = element.data
        people.push(temp)
      });
      this.people = people
    })
  }

  handleRemoveButton(id){
    console.log('Emitting removeId from table component');
    this.removeId.emit(id)
  }

  
  handleInfoButton(id){
    console.log('Emitting infoId from table component');
    this.infoId.emit(id)
  }
}
