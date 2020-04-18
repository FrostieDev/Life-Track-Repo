import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//HttpInterceptor intercepts every http request and puts it in a new packet. 
//In this class we append the users jwt token to every request. 
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("id_token");

    if (idToken) {
      //if the JWT is present, then we will clone the HTTP headers, and add an extra Authorization header, which will contain the JWT
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          String('Bearer ' + idToken.replace(/['"]+/g, '')))
      });
      console.log(cloned);
      return next.handle(cloned);
    } else {
      console.log(idToken);
      return next.handle(req);
    }
  }
}
