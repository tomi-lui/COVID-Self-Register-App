import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  // @Input() peopleInput
  peopleInput: Array<any>
  @Output() infoId = new EventEmitter()
  @Output() removeId = new EventEmitter()

  constructor(private ps: PeopleService) { }

  ngOnInit(): void {
    this.peopleInput = this.ps.getPeople()
    console.log(this.peopleInput);
    
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
