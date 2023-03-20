import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ProfileType } from 'src/app/enums/profile-type.enum';
import { Profile } from 'src/app/models/profile.model';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  profile: Profile = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: null,
    contactNumber: '',
    countryOfResidence: '',
    zipCode: '',
    accountType: ProfileType.REGISTERED_USER,
    shipments: null
  };

  constructor(private oauthService: OAuthService) {}

  ngOnInit(): void {
    this.profile.firstName = keycloak.tokenParsed?.given_name ?? null;
    this.profile.lastName = keycloak.tokenParsed?.family_name ?? null;
    this.profile.email = keycloak.tokenParsed?.email ?? null;
  }


  onSubmit() {
    // Handle form submission here
    //#region 
    /*
     if (this.profileForm.valid) {
      this.http.post('/api/profile', this.profile).subscribe(() => {
        // Handle success here
      }, error => {
        // Handle error here
      });
    }
    */
    //#endregion
  }
}