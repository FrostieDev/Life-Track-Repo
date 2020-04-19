import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Quote } from 'src/app/models/quote';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private httpClient: HttpClient;

  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler); // To avoid auth interceptor.
  }
  // cors anywhere is a proxy. Cors is blocking request, because of cross site forgery. 
  private apiURL = 'http://localhost:3000/quote';

  getQuote(): Observable<Quote> {
    return this.httpClient.get<Quote>(this.apiURL + '/get')
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
