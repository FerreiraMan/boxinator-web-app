import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/sso-config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import keycloak from 'src/keycloak';
import { ProfileService } from 'src/app/services/profile.service';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})  
export class NavbarComponent implements OnInit {

  name: string = "";

  constructor (
    private oauthService: OAuthService,
    private profileService: ProfileService,
    private route: ActivatedRoute
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

  handleLogout() {
    this.profileService.logoutProfile().pipe(
      tap((response) => {
        //console.log('Session-based logout successful:', response);
        StorageUtil.sessionStorageRemove;
      }),
    ).subscribe(() => {
      keycloak.logout().then(() => {
        //console.log('Keycloak logout successful');
        StorageUtil.sessionStorageRemove;
      }).catch((error) => {
        //console.error('Keycloak logout error:', error);
      });
    }, (error) => {
      //console.error('Session-based logout error:', error);
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
