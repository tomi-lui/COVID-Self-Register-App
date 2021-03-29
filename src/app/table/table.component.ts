import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() peopleInput
  @Output() infoId = new EventEmitter()
  @Output() removeId = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
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
