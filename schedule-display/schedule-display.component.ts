import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
// import { weekdayPipe } from 

@Component({
  selector: 'app-schedule-display',
  templateUrl: './schedule-display.component.html',
  styleUrls: ['./schedule-display.component.css']
})
export class ScheduleDisplayComponent implements OnInit {
  viewMode = 'current';
  viewMode2 = 'zone1';
  @Input() user_number: number;
  scheduleList: any[];
  week: any[6] = [];//for sure "week: any[6] = [];" works
  //dayZones: any[2] = [];//array to hold 3 zone schedules per day
  scheduleObj = {} as formOfSchedule;
  currentZone: number;
  // arrayFill: number;
  // blankArray: any[];

  //URLs
  scheduleCreateURL = "http://localhost:8080/restserver/webapi/schedule/create/";
  scheduleReadURL = "http://localhost:8080/restserver/webapi/schedule/read/";//+ user number
  scheduleUpdateURL = "http://localhost:8080/restserver/webapi/schedule/update/";
  scheduleDeleteURL = "http://localhost:8080/restserver/webapi/schedule/delete/";

  constructor(private http: Http) { }

  setSchedule(f) {
    console.log(f);
    //parse form data creat schedule obj
    this.scheduleObj.day_of_week = (f.value.schedule.dayOfWeek as number);
    this.scheduleObj.minutes = f.value.schedule.duration;
    this.scheduleObj.user_number = this.user_number;
    this.scheduleObj.time = f.value.schedule.startTime;
    //get zone by viewmode
    switch (this.viewMode2) {
      case 'zone1': {
        this.scheduleObj.zone_address = 1;
        this.currentZone = 1;
        break;
      }
      case 'zone2': {
        this.scheduleObj.zone_address = 2;
        this.currentZone = 2;
        break;
      }
      case 'zone3': {
        this.scheduleObj.zone_address = 3;
        this.currentZone = 3;
        break;
      }
      default: {
        console.log("error: unable to determine zone")
      }
    }
    console.log("creating sched for zone: ", this.currentZone);
    console.log(this.scheduleObj);

    //request
    this.http.post(this.scheduleCreateURL, this.scheduleObj)
      .subscribe(response => {
        console.log("schedule created: ");
        console.log(response.json());
        //add new sched to display
        this.buildSchedule();
        this.viewMode = 'current';
      })


  }


  readSchedule() {
    return new Promise<any>((resolve, reject) => {
      console.log(this.scheduleReadURL);
      console.log("reading schedule for user number " + this.user_number);
      //request
      this.http.get(this.scheduleReadURL)
        .subscribe(response => {
          console.log("saving list of schedules");
          this.scheduleList = response.json();
          console.log(this.scheduleList);
          resolve(response.json());
        })

    })

  }


  //*note!!!--database indexes day of week starting at 1, and week array indexes starting at 0
  buildSchedule() {
    let i: number;
    let j: number;
    //let dayZones: any[2] = [];// temp array to hold 3 zone schedules per day
    //read current
    this.readSchedule().then(response => {
      console.log("response: ", response);
      //parse data
      for (j = 0; j < 7; j++) {
        console.log("checking day of week: ", j);
        let dayZones: any[] = [];
        for (i = 0; i < this.scheduleList.length; i++) {
          console.log("checking schedule object: ", i);
          if ((this.scheduleList[i].day_of_week as number) == (j + 1)) {
            console.log("week array:", this.week);
            console.log("day found saving sched in week array", this.scheduleList[i]);

            //insert sched obj into dayzones array
            dayZones.splice(0, 0, this.scheduleList[i]);

          }
        }
        console.log("by ref", dayZones);
        this.week[j] = dayZones.slice(0);//fill weekday with temp list of 0-3 objs
      }
    }).catch(error => {
      console.log("error:", error);
    });

  }

  deleteSchedule(x) {
    let y = {} as formOfSchedule;
    y.day_of_week = x.day_of_week;
    y.user_number = this.user_number;
    y.zone_address = x.zone_address;
    y.time = x.time;
    y.minutes = x.minutes;

    console.log(y);

    this.http.delete(this.scheduleDeleteURL, {body: y})
      .subscribe(response => {
          console.log("schedule deleted", response.json());
          this.buildSchedule();
          this.viewMode = 'current';
      })

  }

  ngOnInit() {

    //append user number to url
    this.scheduleReadURL = this.scheduleReadURL + this.user_number;
    this.buildSchedule();
    // let i: number;
    // let j: number;
    // //let dayZones: any[2] = [];// temp array to hold 3 zone schedules per day
    // //read current
    // this.readSchedule().then(response => {
    //   console.log("response: ", response);
    //   //parse data
    //   for (j = 0; j < 7; j++) {
    //     console.log("checking day of week: ", j);
    //     let dayZones: any[] = [];
    //     for (i = 0; i < this.scheduleList.length; i++) {
    //       console.log("checking schedule object: ", i);
    //       if ((this.scheduleList[i].day_of_week as number) == j) {
    //         console.log("week array:", this.week);
    //         console.log("day found saving sched in week array", this.scheduleList[i]);

    //         //insert sched obj into dayzones array
    //         dayZones.splice(0, 0, this.scheduleList[i]);

    //         }
    //       }
    //       console.log("by ref", dayZones);
    //       this.week[j] = dayZones.slice(0);//fill weekday with temp list of 0-3 objs
    //   }
    // }).catch(error => {
    //   console.log("error:", error);
    // });

  }





}


//interface for schedule
export interface formOfSchedule {
  user_number: number;
  zone_address: number;//1-3
  day_of_week: number;//0-6
  time: string;
  minutes: number;//0-90
}
