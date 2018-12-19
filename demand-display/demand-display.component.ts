import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-demand-display',
  templateUrl: './demand-display.component.html',
  styleUrls: ['./demand-display.component.css']
})
export class DemandDisplayComponent implements OnInit {

  //from login component
  @Input() isLoggedIn: boolean;
  @Input() user_number: number;

/* ******note*****ideally http requests should be extracted to a service instead
of remaining in components, but for development and functionality needs
such requests are remaining local to the components they service */
  //URLs
  demandPostURL = "http://localhost:8080/restserver/webapi/onDemand/create/";
  demandReadURL = "http://localhost:8080/restserver/webapi/onDemand/read/";
  demandDeleteURL = "http://localhost:8080/restserver/webapi/onDemand/delete/";

  //local props
  isDemanded: boolean;
  zone1 = false;
  zone2 = false;
  zone3 = false;
  duration1: number;
  duration2: number;
  duration3: number;
  demandedList: any[];

  constructor(private http: Http) {

  }

  setOnDemand(f) {
    console.log(f);

    //parse form to get user inputs
    this.zone1 = f.value.demand.zone1;
    this.zone2 = f.value.demand.zone2;
    this.zone3 = f.value.demand.zone3;
    this.duration1 = f.value.demand.duration1;
    this.duration2 = f.value.demand.duration2;
    this.duration3 = f.value.demand.duration3;

    //demand objs to be sent to DB
    let newDemand1 = { user_number: this.user_number, zone_address: 1, minutes: this.duration1 };
    let newDemand2 = { user_number: this.user_number, zone_address: 2, minutes: this.duration2 };
    let newDemand3 = { user_number: this.user_number, zone_address: 3, minutes: this.duration3 };

    //http service to create a demand (One for each zone)
    if (this.zone1) {
      this.http.post(this.demandPostURL, newDemand1)
        .subscribe(response => {
          console.log("demand for zone 1 has been created:");
          console.log(response.json());
        })
    }
    if (this.zone2) {
      this.http.post(this.demandPostURL, newDemand2)
        .subscribe(response => {
          console.log("demand for zone 2 has been created:");
          console.log(response.json());
        })
    }
    if (this.zone3) {
      this.http.post(this.demandPostURL, newDemand3)
        .subscribe(response => {
          console.log("demand for zone 3 has been created:");
          console.log(response.json());
        })
    }
    this.isDemanded = true;
    console.log("read demands with " + this.demandReadURL + this.user_number);

  }

  readDemands(user_number) {

    return new Promise<any>((resolve, reject) => {
      console.log("reading demands");
      console.log(user_number);
      this.http.get(this.demandReadURL + user_number)
        .subscribe(response => {
          this.demandedList = response.json();
          console.log(this.demandedList);
          resolve(response.json());
        })
    })
  }

  cancelDemands() {
    console.log("deleting demands");
    console.log(this.user_number);
    console.log(this.demandDeleteURL + this.user_number);
    this.http.get(this.demandDeleteURL + this.user_number)
      .subscribe(response => {
        console.log("demands cleared");
      })
    this.isDemanded = false;
  }


  checkValid(f) {
    if (f.value.demand.zone1 || f.value.demand.zone2 || f.value.demand.zone3) {
      if (f.value.demand.duration1 || f.value.demand.duration2 || f.value.demand.duration3)
        return true;
    }
    return false;
  }

  ngOnInit() {
    //check if there are demands
    if (this.user_number) {
      this.readDemands(this.user_number).then(response => {
        console.log("Response: ", response);
        //handle loaded logic
        if (this.demandedList.length) {
          console.log("changing view to already demanded");
          this.isDemanded = true;
        }
      }).catch(error => {
        console.log("There was an error: ", error);
      });
    }


  }

}
