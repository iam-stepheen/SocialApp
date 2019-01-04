import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFreindsComponent } from './find-freinds.component';

describe('FindFreindsComponent', () => {
  let component: FindFreindsComponent;
  let fixture: ComponentFixture<FindFreindsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindFreindsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindFreindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
