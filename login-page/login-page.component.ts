import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { Http, RequestOptions } from '@angular/http';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit { // implement onInIt later

  /* ideal contructor with extracted service
  constructor(service: UserService) { 

  }*/

  /* ******note*****ideally http requests should be extracted to a service instead
of remaining in components, but for development and functionality needs
such requests are remaining local to the components they service */

  userReadURL = "http://localhost:8080/restserver/webapi/user/read/";
  //full user obj must be sent with put & post requests
  userPutURL = "http://localhost:8080/restserver/webapi/user/update/";
  userPostURL = "http://localhost:8080/restserver/webapi/user/create";
  attemptReadURL: string;
  attemptPutURL: string;// likely unused
  user: any;
  @Input() isLoggedIn: boolean;
  create: boolean = false;
  newUser = {} as formOfUser;
  logInFail: boolean;


  //event emitter instance to publish data to the app component
  @Output() publish = new EventEmitter();


  //temp contructor with hardcoded service
  constructor(private http: Http) {

  }

  ngOnInit() {
    //called when component is instantiated
  }

  createUser(f) {//revisit to fix
    console.log(f);
    //intake new user info
    this.newUser.email = f.value.newUser.email;
    this.newUser.first_name = f.value.newUser.firstName;
    this.newUser.last_name = f.value.newUser.lastName;
    this.newUser.user_name = f.value.newUser.user_name;
    this.newUser.password = f.value.newUser.password;
    //set headers
    //let headers = new Headers();
   // headers.append('Content-Type', 'application/json');
    //let options = new RequestOptions({headers:headers});
    console.log("creating new user: ");
    console.log(this.newUser);
    this.http.post(this.userPostURL, this.newUser)
      .subscribe(response => {
        console.log(response.json());
      })

    this.create = false;
  }
  //recieves obj from login form 
  //sends a get request to server for user with that username
  //if that user exists, access is granted **revist for improved password security**
  attemptLogin(f) {
    console.log("attempting login as " + f.value.logAttempt.user_name)
    //append user input to get request url
    this.attemptReadURL = this.userReadURL + f.value.logAttempt.user_name;
    console.log(this.attemptReadURL);

    //send request with dynamic username
    this.http.get(this.attemptReadURL)
      .subscribe(response => {
        this.user = response.json();
        console.log(this.user);

        //if null, user doesnt exist
        if (this.user == null){
          console.log("Username not found");
          this.logInFail = true;
        }
        else {
          this.isLoggedIn = true;
          this.logInFail = false;
          console.log("logged in as " + this.user.user_name); // insert routing here to exit login page
          this.publish.emit(this.user);
          //this.attemptPutURL = this.userPutURL + (this.user.user_number as string);
          //console.log("new put url with your user number:");
          //console.log(this.attemptPutURL);
        }
      });
  }

  logout() {
    location.reload(true);//refresh page from server
  }

  //test to change username
  //move to user page once data sharing saturated
  updateUserName() {
    console.log(" changing username to testuserChange");
    console.log(this.user);
    console.log(this.userPutURL);
    this.user.user_name = "testuserChange";
    this.http.put(this.userPutURL, this.user)
      .subscribe(response => {
        console.log(response.json());
      })
  }

}

//interface to specify the shape of the user object
//that this component will pass to the root
export interface formOfUser {
  user_name: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  update_schedule: number;
  user_number: number;
}