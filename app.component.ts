import { Component } from '@angular/core';
import { CommonModule } from '@angular/common' ;
import { formOfUser } from './login-page/login-page.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
]
})
export class AppComponent {
  title = 'The Smart Garden Controller';
  mainView = 'login';

  //some public info from sub-components
  isLoggedIn: boolean;
  user: any;
  unitType: string;

  //method to recieve unittype
  onUnitChange(x:string) {
    this.unitType = x;
    console.log("root recieved unit type change: " + x);
  }

  //method to recieve login info from login component
  onLogin(loggedUser: formOfUser) {
    this.isLoggedIn = true;
    this.user = loggedUser;
    this.mainView = 'schedule';
    console.log("root recieved login by user:", this.user);
  }

}
