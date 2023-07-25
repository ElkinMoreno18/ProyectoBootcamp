import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainComponentComponent } from './main-component.component';

describe('MainComponentComponent', () => {
  let component: MainComponentComponent;
  let fixture: ComponentFixture<MainComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
