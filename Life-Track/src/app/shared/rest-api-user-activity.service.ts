import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { Activity, Category } from '../models/activity';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/*** ========================================
   CRUD Methods for consuming RESTful API
 =========================================*/
export class RestApiUserActivityService {
  private apiURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getUsers(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUser(id: string): Promise<User> {
    return this.http.get<User>(this.apiURL + '/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      ).toPromise();
  }

  // HttpClient API post() method => Create employee
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURL + '/add', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  addActivity(id: string, activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(this.apiURL + '/' + id + '/activities/add', JSON.stringify(activity), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteActivity(_id: string, _aid: string) {
    let reqUrl = this.apiURL + '/' + _id + '/activities/' + _aid + '/delete';
    console.log("Requesting " + reqUrl);
    return this.http.put<User>(reqUrl, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
