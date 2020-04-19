import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { ActivityDashboardModule } from './activity-dashboard/activity-dashboard.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavHeadComponent } from './nav-head/nav-head.component';
import { NavFootComponent } from './nav-foot/nav-foot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserInformationComponent } from './user-information/user-information.component';

import { AuthInterceptorService } from './shared/auth-interceptor.service';
import { CanActivateService } from './shared/routeGuard/can-activate.service';
import { ShowQuoteComponent } from './shared/quote/show-quote/show-quote.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavHeadComponent,
    NavFootComponent,
    UserInformationComponent,
    ShowQuoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ActivityDashboardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    CanActivateService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
