import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/sso-config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import keycloak from 'src/keycloak';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})  
export class NavbarComponent implements OnInit {

  name: string = "";

  constructor (private oauthService: OAuthService) { }

  ngOnInit(): void {
    this.configureSingleSignOn();
    const userClaims: any = this.oauthService.getIdentityClaims();
    this.name = userClaims.name ? userClaims.name : "";
  }

  configureSingleSignOn() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  handleLogin() {
    //this.oauthService.initCodeFlow();
    keycloak.login()
  }

  handleLogout() {
    //this.oauthService.logOut();
    keycloak.logout()
  }

  get token(){
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }

  handleToken() {
    if (keycloak.token != null) {
      return true;
    }
    return null
  }

}
