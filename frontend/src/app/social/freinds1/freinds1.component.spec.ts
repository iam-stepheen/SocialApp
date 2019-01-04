import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Freinds1Component } from './freinds1.component';

describe('Freinds1Component', () => {
  let component: Freinds1Component;
  let fixture: ComponentFixture<Freinds1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Freinds1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Freinds1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
