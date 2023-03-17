import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import keycloak from 'src/keycloak';
import { authCodeFlowConfig } from 'src/app/sso-config';

@Component({
  selector: 'app-login.page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginComponent implements OnInit {

  name: string = "";

  constructor (
    private oauthService: OAuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.configureSingleSignOn();
    //const userClaims: any = this.oauthService.getIdentityClaims();
    //this.name = userClaims.name ? userClaims.name : "";
  }

  configureSingleSignOn() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    //this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  handleLogin() {
    keycloak.redirectUri = window.location.origin + "/profile";      
    keycloak.login().then(() => {
    });
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

