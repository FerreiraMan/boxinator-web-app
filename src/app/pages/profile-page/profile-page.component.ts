import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ProfileType } from 'src/app/enums/profile-type.enum';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import keycloak from 'src/keycloak';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  profile: Profile = {
    //id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '123123123',
    countryOfResidence: '',
    dateOfBirth: null,
    postalCode: '',
    contactNumber: '',
    //accountType: ProfileType.REGISTERED_USER,
    //shipments: null
  };


  constructor(
    private oauthService: OAuthService,
    private profileService: ProfileService,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = keycloak.tokenParsed?.sub;
    //console.log("id: " + id);
        
    this.profile.firstName = keycloak.tokenParsed?.given_name ?? null;
    this.profile.lastName = keycloak.tokenParsed?.family_name ?? null;
    this.profile.email = keycloak.tokenParsed?.email ?? null;
    if (id) {
      this.profileService.getProfile(id).subscribe(profile => {
        if (profile) {
          // Profile exists on the server, fetch and fill out the form
          this.profile = profile;
        } else {
          // Profile does not exist on the server, keep form empty
        }
        StorageUtil.sessionStorageSave('userId', id); // store user's id in local storage
      });
    }
}


onSubmit() {
  const userId = StorageUtil.sessionStorageRead('userId');
if (typeof userId === 'string' && userId.length > 0) {
  // update existing profile
  this.profileService.saveProfile(userId, this.profile).subscribe(
    (savedProfile) => {
      // Handle success case
      console.log("sucess in updating user");
    },
    (error) => {
      // Handle error case
      console.log("error in updated user");
    }
  );
} else {
  // create new profile
  this.profileService.createProfile(this.profile).subscribe(
    (createdProfile) => {
      StorageUtil.sessionStorageSave('mail', createdProfile.email); // store user's mail in local storage
      // Handle success case
      console.log("sucess in creating user");
    },
    (error) => {
      // Handle error case
      console.log(this.profile);
      console.log("error in creating user", error);
    }
  );
}
}
}

