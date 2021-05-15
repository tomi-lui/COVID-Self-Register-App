import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-new-report-button',
  templateUrl: './new-report-button.component.html',
  styleUrls: ['./new-report-button.component.css']
})
export class NewReportButtonComponent implements OnInit {

  @Output() report = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  handleReportButton(evt){
    console.log('Emitting from new-report-button component');
    this.report.emit(evt)
  }
}
