import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import keycloak from 'src/keycloak';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      var isAuth = keycloak.authenticated;
      if (isAuth) {
        return true;
      } else {
        this.router.navigateByUrl("/login");
        return false;
      };
  }
}
