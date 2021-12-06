import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWatch } from './addWatch.component';

describe('HomeComponent', () => {
  let component: AddWatch;
  let fixture: ComponentFixture<AddWatch>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWatch ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWatch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
