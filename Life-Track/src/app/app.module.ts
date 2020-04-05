import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ActivityDashboardModule } from './activity-dashboard/activity-dashboard.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavHeadComponent } from './nav-head/nav-head.component';
import { NavFootComponent } from './nav-foot/nav-foot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserInformationComponent } from './user-information/user-information.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavHeadComponent,
    NavFootComponent,
    UserInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ActivityDashboardModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
