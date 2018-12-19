import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandDisplayComponent } from './demand-display.component';

describe('DemandDisplayComponent', () => {
  let component: DemandDisplayComponent;
  let fixture: ComponentFixture<DemandDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
