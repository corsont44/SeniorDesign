import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {
  //switches
  viewMode = 'recent';
  rangeSet: boolean = false;

  //controller recents
  cRecent: any;
  tempPressure: any[] = [];
  tempLabelC: any[] = [];
  tempHumidity: any[] = [];
  tempHLabel: any[] = [];

  //zone recents
  zoneRecent: any[2] = [];
  tempSoil1: any[] = [];
  tempSoil2: any[] = [];
  tempSoil3: any[] = [];
  tempLight1: any[] = [];
  tempLight2: any[] = [];
  tempLight3: any[] = [];
  tempLabelz: any[] = [];
  tempTemp1: any[] = [];
  tempTemp2: any[] = [];
  tempTemp3: any[] = [];
  tempLabelT: any[] = [];

  //recieve user number from root
  @Input() user_number: number;

  //URLs
  sensorReadURL = "http://localhost:8080/restserver/webapi/sensorData/read/";
  bulkDataReadURL = "http://localhost:8080/restserver/webapi/bulkData/read/";
  controllerReadURL = "http://localhost:8080/restserver/webapi/controllerSensorData/read/";

  //datetime string
  dateTimeWindow: string;

  //list to save read info
  dataList: any[];
  dataListC: any[];

  constructor(private http: Http) {

  }

  changeView() {
    this.rangeSet = false;
    this.viewMode = 'time';
  }

  makeDateRange(f) {
    //format: "2018-10-27:00:00:00/2018-10-27:24:00:00"
    console.log(f);
    this.dateTimeWindow = f.value.range.year1 + "-";
    this.dateTimeWindow += f.value.range.month1 + "-";
    this.dateTimeWindow += f.value.range.day1 + ":";
    this.dateTimeWindow += f.value.range.hour1 + ":00:00/";
    this.dateTimeWindow += f.value.range.year2 + "-";
    this.dateTimeWindow += f.value.range.month2 + "-";
    this.dateTimeWindow += f.value.range.day2 + ":";
    this.dateTimeWindow += f.value.range.hour2 + ":00:00";
    console.log(this.dateTimeWindow);

    this.buildData();
    //reset urls
    this.sensorReadURL = "http://localhost:8080/restserver/webapi/sensorData/read/";
    this.bulkDataReadURL = "http://localhost:8080/restserver/webapi/bulkData/read/";
    this.controllerReadURL = "http://localhost:8080/restserver/webapi/controllerSensorData/read/";

    this.viewMode = 'time';
    this.rangeSet = true;

  }

  // makeDateHour() {

  //   //format: "2018-10-27:00:00:00/2018-10-27:24:00:00"
  //   let d = new Date();
  //   this.dateTimeWindow = String(d.getFullYear()) + "-";
  //   this.dateTimeWindow += String(d.getMonth() + 1) + "-";
  //   this.dateTimeWindow += String(d.getDate()) + ":";
  //   this.dateTimeWindow += String(d.getHours() - 1) + ":00:00/";
  //   this.dateTimeWindow += String(d.getFullYear()) + "-";
  //   this.dateTimeWindow += String(d.getMonth() + 1) + "-";
  //   this.dateTimeWindow += String(d.getDate()) + ":24:00:00";
  //   console.log(this.dateTimeWindow);
  //   this.buildData();
  // }

  // makeDateToday() {
  //   //fills date prop with a string current day range
  //   //format: "2018-10-27:00:00:00/2018-10-27:24:00:00"
  //   let d = new Date();
  //   this.dateTimeWindow = String(d.getFullYear()) + "-";
  //   this.dateTimeWindow += String(d.getMonth() + 1) + "-";
  //   this.dateTimeWindow += String(d.getDate()) + ":00:00:00/";
  //   this.dateTimeWindow += String(d.getFullYear()) + "-";
  //   this.dateTimeWindow += String(d.getMonth() + 1) + "-";
  //   this.dateTimeWindow += String(d.getDate()) + ":24:00:00";
  //   console.log(this.dateTimeWindow);
  //   // //for testing
  //   // this.dateTimeWindow = "2018-10-01:00:00:00/2018-11-27:24:00:00";
  //   this.buildData();


  // }

  makeDateAllTime() {
    this.dateTimeWindow = "2018-10-01:00:00:00/2018-11-27:24:00:00";
    console.log(this.dateTimeWindow);
    this.buildData();
    //reset urls
    this.sensorReadURL = "http://localhost:8080/restserver/webapi/sensorData/read/";
    this.bulkDataReadURL = "http://localhost:8080/restserver/webapi/bulkData/read/";
    this.controllerReadURL = "http://localhost:8080/restserver/webapi/controllerSensorData/read/";

  }


  buildTempChart() {
    //implmentation for bar chart in canvas tag
    let ctx = document.getElementById("tempChart");
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.tempLabelz,
        datasets: [{
          label: "Zone 1 (°C)",
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: this.tempTemp1,
        },
        {
          label: "Zone 2 (°C)",
          lineTension: 0.3,
          backgroundColor: "rgba(240,24,24,0.2)",
          borderColor: "rgba(240,24,24,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(240,24,24,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(240,24,24,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: this.tempTemp2,
        },
        {
          label: "Zone 3 (°C)",
          lineTension: 0.3,
          backgroundColor: "rgba(24,240,24,0.2)",
          borderColor: "rgba(24,240,24,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(24,240,24,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(24,240,24,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: this.tempTemp3,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: true
            },
            ticks: {
              maxTicksLimit: 100
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 50,
              maxTicksLimit: 10
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: true
        }
      }
    });
  }

  buildLightChart() {
    console.log(this.tempLabelz);
    var ctx = document.getElementById("lightChart");
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.tempLabelz,
        datasets: [{
          label: "Zone 1 (%)",
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: this.tempLight1,
        },
        {
          label: "Zone 2 (%)",
          lineTension: 0.3,
          backgroundColor: "rgba(240,24,24,0.2)",
          borderColor: "rgba(240,24,24,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(240,24,24,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(240,24,24,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: this.tempLight2,
        },
        {
          label: "Zone 3 (%)",
          lineTension: 0.3,
          backgroundColor: "rgba(24,240,24,0.2)",
          borderColor: "rgba(24,240,24,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(24,240,24,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(24,240,24,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: this.tempLight3,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: true
            },
            ticks: {
              maxTicksLimit: 100
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
              maxTicksLimit: 10
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: true
        }
      }
    });
  }


  buildMoistChart() {
    let ctx = document.getElementById("soilMoistBar");
    let myLineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tempLabelz,
        datasets: [{
          label: "Zone 1 (pF)",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: this.tempSoil1,
        },
        {
          label: "Zone 2 (pF)",
          backgroundColor: "rgba(240,24,24,1)",
          borderColor: "rgba(240,24,24,1)",
          data: this.tempSoil2,
        },
        {
          label: "Zone 3 (pF)",
          backgroundColor: "rgba(24,240,24,1)",
          borderColor: "rgba(24,240,24,1)",
          data: this.tempSoil3,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: true
            },
            ticks: {
              maxTicksLimit: 100
            }
          }],
          yAxes: [{
            ticks: {
              min: 200,
              max: 750,
              maxTicksLimit: 10
            },
            gridLines: {
              display: true
            }
          }],
        },
        legend: {
          display: true
        }
      }
    });
  }

  buildHumidNow() {

    var ctx = document.getElementById("humidPie");
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Current Humidity (%)"],
        datasets: [{
          data: [this.cRecent.humidity, (100 - this.cRecent.humidity)],
          backgroundColor: ['#007bff', '#b7b7bc', '#ffc107', '#28a745'],
        }],
      },
    });

  }

  buildPressureChart() {
    var ctx = document.getElementById("pressureBar");
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.tempLabelC,
        datasets: [{
          label: "Pressure (Pascals)",
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: this.tempPressure,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: true
            },
            ticks: {
              maxTicksLimit: 100
            }
          }],
          yAxes: [{
            ticks: {
              min: 80000,
              max: 110000,
              maxTicksLimit: 10
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: true
        }
      }
    });
  }

  buildData() {
    //clear temp arrays

    //controller recents
  this.tempPressure = [];
  this.tempLabelC = [];
  this.tempHumidity = [];
  this.tempHLabel = [];

  //zone recents
  this.tempSoil1 = [];
  this.tempSoil2 = [];
  this.tempSoil3 = [];
  this.tempLight1 = [];
  this.tempLight2 = [];
  this.tempLight3 = [];
  this.tempLabelz = [];
  this.tempTemp1 = [];
  this.tempTemp2 = [];
  this.tempTemp3 = [];


    //build read urls with input info
    this.sensorReadURL = this.sensorReadURL + this.user_number + "/";//append user
    this.controllerReadURL = this.controllerReadURL + this.user_number + "/";
    this.sensorReadURL += this.dateTimeWindow;//append day time window
    this.controllerReadURL += this.dateTimeWindow;//all of these need to happen outside build

    console.log(this.sensorReadURL);
    console.log(this.controllerReadURL);

    //http request for sensor data today
    new Promise<any>((resolve, reject) => {
      console.log("reading sensor data for today");
      console.log(this.user_number);
      this.http.get(this.sensorReadURL)
        .subscribe(response => {
          this.dataList = response.json();
          console.log(response.json());
          //parse data for recent display
          let temp = this.dataList.slice();
          temp.reverse();
          let i;
          for (i = 1; i < 4; i++) {
            this.zoneRecent[(i - 1)] = temp.find(function (element) {
              return (element.zone_address == i);
            });
          }
          //extract soil data
          console.log(this.dataList);
          let j;
          let k;
          for (j = 0; j < this.dataList.length; j++) {
            if (this.dataList[j].zone_address == 1) {
              this.tempSoil1.push(this.dataList[j].moisture);
              this.tempLight1.push(this.makePercent(this.dataList[j].light));
              this.tempLabelz.push(this.dataList[j].datetime);//push Date value only once per cycle. 
              // former problem with the multidata graph, the date array fills with the total number
              //of zone data objs, but the x axis of graph should be only 1/3 the length
              this.tempTemp1.push(this.dataList[j].temperature);
            }
            else if (this.dataList[j].zone_address == 2) {
              this.tempSoil2.push(this.dataList[j].moisture);
              this.tempLight2.push(this.makePercent(this.dataList[j].light));
              this.tempTemp2.push(this.dataList[j].temperature);
            }
            else {
              this.tempSoil3.push(this.dataList[j].moisture);
              this.tempLight3.push(this.makePercent(this.dataList[j].light));
              this.tempTemp3.push(this.dataList[j].temperature);
            }
          }


          this.buildTempChart();
          this.buildLightChart();
          this.buildMoistChart();



          resolve(response.json());
        })
    })

    //request for controller data today
    let p = new Promise<any>((resolve, reject) => {
      console.log("reading conntroller data for today");
      console.log(this.user_number);
      this.http.get(this.controllerReadURL)
        .subscribe(response => {
          this.dataListC = response.json();
          console.log(response.json());
          console.log("extracting recent controller data");
          let tempC: any[] = this.dataListC.slice();
          this.cRecent = tempC.pop();
          //extract pressure data
          let i;
          for (i = 0; i < this.dataListC.length; i++) {
            this.tempPressure.push(this.dataListC[i].pressure);
            this.tempLabelC.push(this.dataListC[i].datetime);
            this.tempHumidity.push(this.dataListC[i].humidity);
          }

          console.log("building humidity, pressure & wind");
          console.log(this.cRecent);
          this.buildHumidNow();
          this.buildPressureChart();
          resolve(response.json());
        })
    })

  }

  makePercent(x: number) {
    if (x > 30000)
      return 0;
    else if (x < 200)
      return 100;
    else {
      return (100 - (((x - 200) * 100) / 28800));
    }
  }


  ngOnInit() {
    this.makeDateAllTime();
    // //build read urls with input info
    // this.sensorReadURL = this.sensorReadURL + this.user_number + "/";//append user
    // this.controllerReadURL = this.controllerReadURL + this.user_number + "/";
    // this.makeDateWindow();
    // this.sensorReadURL += this.dateTimeWindow;//append day time window
    // this.controllerReadURL += this.dateTimeWindow;
    // console.log(this.sensorReadURL);
    // console.log(this.controllerReadURL);

    // //http request for sensor data today
    // new Promise<any>((resolve, reject) => {
    //   console.log("reading sensor data for today");
    //   console.log(this.user_number);
    //   this.http.get(this.sensorReadURL)
    //     .subscribe(response => {
    //       this.dataList = response.json();
    //       console.log(response.json());
    //       //parse data for recent display
    //       let temp = this.dataList.slice();
    //       temp.reverse();
    //       let i;
    //       for (i = 1; i < 4; i++) {
    //         this.zoneRecent[(i - 1)] = temp.find(function (element) {
    //           return (element.zone_address == i);
    //         });
    //       }
    //       //extract soil data
    //       console.log(this.dataList);
    //       let j;
    //       for (j = 0; j < this.dataList.length; j++) {
    //         if (this.dataList[j].zone_address == 1) {
    //           this.tempSoil1.push(this.dataList[j].moisture);
    //           this.soilLabel.push(this.dataList[j].datetime);
    //         }
    //         else if (this.dataList[j].zone_address == 2) {
    //           this.tempSoil2.push(this.dataList[j].moisture);
    //           this.soilLabel.push(this.dataList[j].datetime);
    //         }
    //         else {
    //           this.tempSoil3.push(this.dataList[j].moisture);
    //           this.soilLabel.push(this.dataList[j].datetime);
    //         }
    //       }


    //       this.buildBarChart();
    //       this.buildLightChart();
    //       this.buildMoistChart();



    //       resolve(response.json());
    //     })
    // })

    // //request for controller data today
    // let p = new Promise<any>((resolve, reject) => {
    //   console.log("reading conntroller data for today");
    //   console.log(this.user_number);
    //   this.http.get(this.controllerReadURL)
    //     .subscribe(response => {
    //       this.dataListC = response.json();
    //       console.log(response.json());
    //       console.log("extracting recent controller data");
    //       let tempC: any[] = this.dataListC.slice();
    //       this.cRecent = tempC.pop();
    //       //extract pressure data
    //       let i;
    //       for (i = 0; i < this.dataListC.length; i++) {
    //         this.tempPressure.push(this.dataListC[i].pressure);
    //         this.tempLabel.push(this.dataListC[i].datetime);
    //         this.tempHumidity.push(this.dataListC[i].humidity);
    //       }

    //       console.log("building humidity, pressure & wind");
    //       console.log(this.cRecent);
    //       this.buildHumidNow();
    //       this.buildPressureChart();
    //       resolve(response.json());
    //     })
    // })

  }





}

/*
[this.dataListC[0].datetime, this.dataListC[1].datetime, this.dataListC[2].datetime, this.dataListC[3].datetime, this.dataListC[4].datetime, this.dataListC[5].datetime, this.dataListC[6]]
[this.dataListC[0].pressure, this.dataListC[1].pressure, this.dataListC[2].pressure, this.dataListC[3].pressure, this.dataListC[4].pressure, this.dataListC[5].pressure, this.dataListC[6].pressure]
template for bar js file

var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{
      label: "Revenue",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [4215, 5312, 6251, 7841, 9821, 14984],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 15000,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});



    let ctx = document.getElementById("pressureBar");
    let myLineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tempPLabel,
        datasets: [{
          label: "Pressure",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: this.tempPressure,
        }],
      },
      options: { 
        scales: {
          xAxes: [{
            time: {
              unit: 'datetime'
            },
            gridLines: {
              display: true
            },
            ticks: {
              maxTicksLimit: 6
            }
          }],
          yAxes: [{
            ticks: {
              min: 80000,
              max: 110000,
              maxTicksLimit: 5
            },
            gridLines: {
              display: true
            }
          }],
        },
        legend: {
          display: true
        }
      }
    });
*/


/** for full date maker method
      let d = new Date();
     this.dateTimeWindow = String(d.getFullYear()) +"-";
     this.dateTimeWindow += String(d.getMonth()) +"-";
     this.dateTimeWindow += String(d.getDate()) +":";
     this.dateTimeWindow += String(d.getHours()) +":";
     this.dateTimeWindow += String(d.getMinutes()) +":";
     this.dateTimeWindow += String(d.getSeconds()) +"/";
 */