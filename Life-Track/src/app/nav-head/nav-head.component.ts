import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-nav-head',
  templateUrl: './nav-head.component.html',
  styleUrls: ['./nav-head.component.css']
})
export class NavHeadComponent implements OnInit {

  name: string;
  loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUpdate();
    if (this.authService.isLoggedIn()) {
      this.loggedIn = true;
      this.name = localStorage.getItem("name").replace(/['"]+/g, '');
    }
  }

  signOut() {
    this.name = null;
    this.authService.logout();
    console.log(this.authService.isLoggedOut());
  }

  getUpdate() {
    console.log("Get update is called wupwup");
    if (this.authService.isLoggedIn()) {
      this.authService.loggedInObs.subscribe(
        (response) => {
          console.log("Logged in?: " + response);
          this.loggedIn = response;
        }
      )
      this.authService.nameObs.subscribe(
        (response) => {
          console.log("Name: " + response);
          this.name = response;
        }
      )
    } else {
      this.name = null;
      this.loggedIn = false;
    }

  }

}
