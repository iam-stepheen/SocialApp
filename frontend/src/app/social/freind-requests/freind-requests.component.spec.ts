import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreindRequestsComponent } from './freind-requests.component';

describe('FreindRequestsComponent', () => {
  let component: FreindRequestsComponent;
  let fixture: ComponentFixture<FreindRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreindRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreindRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
