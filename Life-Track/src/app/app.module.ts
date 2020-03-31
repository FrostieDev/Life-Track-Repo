import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ActivityDashboardModule } from './activity-dashboard/activity-dashboard.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavHeadComponent } from './nav-head/nav-head.component';
import { NavFootComponent } from './nav-foot/nav-foot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavHeadComponent,
    NavFootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ActivityDashboardModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
