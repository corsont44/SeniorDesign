import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDisplayComponent } from './settings-display.component';

describe('SettingsDisplayComponent', () => {
  let component: SettingsDisplayComponent;
  let fixture: ComponentFixture<SettingsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
