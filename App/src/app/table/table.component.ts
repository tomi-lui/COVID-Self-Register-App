import { Component, OnInit, Input, Output, EventEmitter,Directive} from '@angular/core';
import { PeopleService } from '../people.service';
import { Person } from '../Person'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  people: Array<any>
  name: any
  sortedColumn: string
  @Output() infoId = new EventEmitter()
  @Output() removeId = new EventEmitter()

  constructor(private ps: PeopleService) {}

  ngOnInit(): void {

    // these functions are run only if this app is connected to database
    // //retrieve data, extract the "data" from each object and set it to the people variable
    // this.ps.httpGetData().subscribe( data => {
    //   var people = []
    //   data.forEach(element => {
    //     var temp = {}
    //     temp = element.data
    //     people.push(temp)
    //   });
    //   this.people = people
    // })
    this.people = this.ps.getPeople()
  }

  handleRemoveButton(id:number): void{
    console.log('id at handleRemoveButton() in table',id);
    console.log(typeof id);
    
    this.removeId.emit(id)
  }


  search(): void {
    if (this.name == "") {
      this.ngOnInit()
    } else {
      this.people = this.people.filter( res => {
        console.log(res);
        
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
      })
    }
  }

}
