import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

//Routeguard
@Injectable()
export class CanActivateService implements CanActivate {

  constructor(private auth: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login'])
        .then(function () {
          window.location.reload(); // To update navbar. Hacky. TODO: Maybe fix.
          alert("Your session exceeded time limit. Please login again.");
        });
      return false;
    }
  }
}
