import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings-display',
  templateUrl: './settings-display.component.html',
  styleUrls: ['./settings-display.component.css']
})
export class SettingsDisplayComponent implements OnInit {
  //field to track selected settings tab
  viewMode = 'metrics';
  unitType = 'si';

  @Output() publish = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  zones = [
    { number: 1, occupied: true },
    { number: 2, occupied: true },
    { number: 3, occupied: true }
  ];


  changeUnits(x:string) {//revist fix
    this.unitType = x;
    this.publish.emit(this.unitType);
  }

  toggleZone(zone) {
    zone.occupied = !zone.occupied;
  }

  onOff() {
    //turn off all zones
    this.zones[0].occupied = false;
    this.zones[1].occupied = false;
    this.zones[2].occupied = false;
    
  }




}
