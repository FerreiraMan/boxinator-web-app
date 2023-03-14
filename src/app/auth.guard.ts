import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import keycloak from 'src/keycloak';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private oauthservice: OAuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var hasIdToken = this.oauthservice.hasValidIdToken();
      var isAuth = keycloak.authenticated;
      var hasAcessToken = this.oauthservice.hasValidAccessToken();
      var hasAcessToken1= keycloak.token;
      if (isAuth) {
        return true;
      } else {
        this.router.navigate(["/welcome"]);
        return false;
      };
  }
  
}
