//Temple A. Corson IV
//NID:te789951
//PID:T3391216
//Fall 18 Senior Design 2 
//group 12

//Web app main module


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

//import working components
import { UserDisplayComponentTest } from './user-display-test.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { DataDisplayComponent } from './data-display/data-display.component';
import { SettingsDisplayComponent } from './settings-display/settings-display.component';
import { ScheduleDisplayComponent } from './schedule-display/schedule-display.component';
import { DemandDisplayComponent } from './demand-display/demand-display.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { UsersTestService } from './usersTest.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { TestPipe } from './testPipe.pipe';
import { CommonModule } from '@angular/common';
import { InputPhoneDirective } from './input-phone.directive';
import { TestHttpComponent } from './test-http/test-http.component';
// import { weekdayPipe } from './weekday.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserDisplayComponentTest,
    UserDisplayComponent,
    DataDisplayComponent,
    SettingsDisplayComponent,
    ScheduleDisplayComponent,
    DemandDisplayComponent,
    SidebarComponent,
    TopbarComponent,
    LoginPageComponent,
    TestPipe,
    InputPhoneDirective,
     TestHttpComponent
    // weekdayPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: LoginPageComponent },
      { path: 'data', component: DataDisplayComponent },
      { path: 'schedule', component: ScheduleDisplayComponent },
      { path: 'demand', component: DemandDisplayComponent },
      { path: 'settings', component: SettingsDisplayComponent },
      { path: 'user', component: UserDisplayComponent },
    ])
  ],
  providers: [
    UsersTestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
