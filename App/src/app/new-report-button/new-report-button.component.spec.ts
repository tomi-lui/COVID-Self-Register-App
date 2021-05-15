import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReportButtonComponent } from './new-report-button.component';

describe('NewReportButtonComponent', () => {
  let component: NewReportButtonComponent;
  let fixture: ComponentFixture<NewReportButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReportButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
