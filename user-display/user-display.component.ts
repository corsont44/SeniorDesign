import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { formOfUser } from '../login-page/login-page.component';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  //property for view selection
  viewMode = "user-info";

  @Input() user: formOfUser;
  address = {} as formOfAddress;


  //URLs
  userGetURL = "http://localhost:8080/restserver/webapi/user/read/";
  userPutURL = "http://localhost:8080/restserver/webapi/user/update/";
  addressPutURL = "http://localhost:8080/restserver/webapi/address/update/";
  addressGetURL = "http://localhost:8080/restserver/webapi/address/read/";

  //test to log model
  log(x) { console.log(x); }

  //test to log form
  saveChanges(f) {
    console.log(f);
  }



  constructor(private http: Http) { }

  ngOnInit() {
  }

  updateAddress(f) {
    //get address to fill obj
    console.log(f);
    //old
    this.address.user = this.user.user_number;
    //parse number and name from f...street_address
    let x = f.value.address.street_address.indexOf(" ");
    console.log(x);
    let num = f.value.address.street_address.substring(0, x);
    let name = f.value.address.street_address.substring(x + 1);
    console.log(num);
    console.log(name);
    this.address.number = +num;
    this.address.street = name;
    this.address.city = f.value.address.city;
    this.address.zip_code = +f.value.address.zip_code;
    this.address.state = +f.value.address.state;
    //this.address.user_number;//not changeable
    console.log(this.address);

    this.http.put(this.addressPutURL, this.address)
      .subscribe(response => {
        console.log(response.json());
        console.log("address updated: ", response.json());
        this.viewMode = 'address-done';
      })



  }



  updateUser(f) {
    console.log("updating user information, old user:");
    console.log(this.user);
    console.log(this.userPutURL);
    this.user.user_name = f.value.consumer.user_name;
    this.user.password = f.value.consumer.password;
    this.user.first_name = f.value.consumer.firstName;
    this.user.last_name = f.value.consumer.lastName;
    this.user.email = f.value.consumer.email;


    this.http.put(this.userPutURL, this.user)
      .subscribe(response => {
        console.log("new user info: ");
        console.log(response.json());
      })

    this.viewMode = 'user-done';
  }
}

export interface formOfAddress {
  city: string;
  number: number;
  state: number;
  street: string;
  user: number;
  zip_code: number;
}