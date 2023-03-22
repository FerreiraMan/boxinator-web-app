import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import keycloak from 'src/keycloak';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }


  getMyAccountOrCreateOne() {
    const { apiUsers } = environment;
    const account =  this.http.get(`${apiUsers}login`)
    return account;    
  }

  getMyAccount() {
    const { apiUsers } = environment;
    return this.http.get(`${apiUsers}login`)
  }

  addAccount() {
    const { apiUsers } = environment;
    const headers = new HttpHeaders({
        "Content-Type": "application/json"});

    const roleArray = keycloak.tokenParsed?.roles;
    let keycloakRole = "";
    keycloakRole = roleArray?.includes('ADMIN') ? 'ADMIN' : 'USER';
    return this.http.post(`${apiUsers}account`,{
      "email": keycloak.tokenParsed?.email,
      "role": keycloakRole,
      "subId": keycloak.tokenParsed?.sub,
      "firstName": keycloak.tokenParsed?.given_name,
      "lastName": keycloak.tokenParsed?.family_name,
      "createdAt":  new Date(),
    }, {headers});
  }
}