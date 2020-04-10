import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { ActivityDashboardModule } from './activity-dashboard/activity-dashboard.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavHeadComponent } from './nav-head/nav-head.component';
import { NavFootComponent } from './nav-foot/nav-foot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserInformationComponent } from './user-information/user-information.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavHeadComponent,
    NavFootComponent,
    UserInformationComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ActivityDashboardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
