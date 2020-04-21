import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { UserAuth } from '../models/userAuth';
import * as moment from "moment";
import { tap } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
//https://blog.angular-university.io/angular-jwt-authentication/
//https://angular-academy.com/angular-jwt/#router-guards
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://localhost:3000/auth';
  private loggedIn = new Subject<boolean>();
  loggedInObs = <Observable<boolean>>this.loggedIn;
  private name = new Subject<string>();
  nameObs = <Observable<string>>this.name;


  constructor(private http: HttpClient) {

  }

  /**
* Update logged in status.
* @param {string}   _loggedIn    State of login session.
* @param {string}   _name    Name of user.
*/
  private updateLoggedIn(_loggedIn: boolean, _name: string) {
    this.loggedIn.next(_loggedIn);
    this.name.next(_name);
  }

  /**
  * Authenticate the user, and set authorization.
  * @param {string}   email    email of login
  * @param {string}   password    password of login
  * @returns {Observable}   Observable of user
  */
  login(email: string, password: string) {
    const requestOptions: Object = { // Will get an HTTP error if not. Returns text instead of JSON.
      responseType: 'text'
    }

    return this.http.post<User>(this.apiURL + '/login', { email, password }, requestOptions)
      .pipe(tap(res => this.setSession(res)));
  }

  signUp(email: string, name: string, password: string) {
    const requestOptions: Object = { // Will get an HTTP error if not. Returns text instead of JSON.
      responseType: 'text'
    }

    return this.http.post<UserAuth>(this.apiURL + '/signup', { email, name, password }, requestOptions)
      .pipe(tap(res => this.setSession(res)));
  }

  /**
  * Sets a session in browser.
  * @param {JSON}   authResult    Login request
  */
  private setSession(authResult) {

    var auth = JSON.parse(authResult);

    const expiresAt = moment().add(auth.expiresIn, 'second');
    localStorage.setItem("name", JSON.stringify(auth.name));
    localStorage.setItem("userId", JSON.stringify(auth.userId));
    localStorage.setItem('id_token', JSON.stringify(auth.idToken));
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));

    this.updateLoggedIn(true, auth.name);
  }

  /**
* Logs out user of the application.
*/
  public logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("userId");
    this.updateLoggedIn(false, null);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
