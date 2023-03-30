import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import keycloak from 'src/keycloak';
import { authCodeFlowConfig } from 'src/app/sso-config';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-login.page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginComponent implements OnInit {

  name: string = "";

  constructor (
    private oauthService: OAuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.configureSingleSignOn();
    //const userClaims: any = this.oauthService.getIdentityClaims();
    //this.name = userClaims.name ? userClaims.name : "";
    console.log("idToken1: " +  this.oauthService.getIdToken());
    console.log("userprofile1: " +  this.oauthService.loadUserProfile());
  }

  configureSingleSignOn() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    //this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  handleLogin() {
    keycloak.redirectUri = window.location.origin + "/profile";  
    keycloak.login().then(() => {
      const token = keycloak.token;
      StorageUtil.sessionStorageSave('token', token);
    });
    //console.log("idToken2: " +  this.oauthService.getIdToken());
    //console.log("userprofile2: " +  this.oauthService.loadUserProfile());
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

