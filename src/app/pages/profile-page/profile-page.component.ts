import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import keycloak from 'src/keycloak';
import { HttpClient } from '@angular/common/http';
import { LoggedUser } from 'src/app/models/loggedUser';
import { InitialRegister } from 'src/app/models/initialRegis';
import { GetterProfile } from 'src/app/models/GetterProfile';
import Swal from 'sweetalert2';
import { Countries } from 'src/app/enums/Countries.enum';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  public countries = Object.values(Countries);

  profile: Profile = {
    firstName: '',
    lastName: '',
    email: '',
    password: '123123123',
    dateOfBirth: null,
    countryOfResidence: '',
    postalCode: '',
    contactNumber: '',
  };

  loggedUser: LoggedUser = {
    email: '',
    password: '123123123',
  }

  firstRegistration: InitialRegister = {
    firstName: 'default',
    lastName: 'default',
    email: '',
    password: '123123123',
    dateOfBirth: '2023-12-31',
    countryOfResidence: Countries.Portugal,
    postalCode: '',
    contactNumber: '',
  }

  getterProfile: GetterProfile = {
    countryOfResidence: "",
    postalCode: "",
    contactNumber: "",
    dateOfBirth: null
  }
   
  constructor(
    private oauthService: OAuthService,
    private profileService: ProfileService,
    private readonly http: HttpClient,
  ) {}

  ngOnInit(): void {
    const id = keycloak.tokenParsed?.sub;

    this.profile.firstName = keycloak.tokenParsed?.given_name ?? null;
    this.profile.lastName = keycloak.tokenParsed?.family_name ?? null;
    this.profile.email = keycloak.tokenParsed?.email ?? null;
    const registrationComplete = localStorage.getItem(`${this.profile.email}_registrationComplete`);
  
    this.firstRegistration.email = keycloak.tokenParsed?.email ?? null;
    this.profileService.initalRegistration(this.firstRegistration).subscribe(
      (loggedProfile) => {
        //console.log("success in first regi in")
        this.loggedUser.email = this.profile.email;
        //console.log('loggedUser: ', this.loggedUser);
        this.profileService.loginProfile(this.loggedUser).subscribe(
          (loggedProfile) => {
            //console.log("success in logging in");
            //console.log("fetchedProfile: ");
            
            this.profileService.getProfile().subscribe((getter: GetterProfile) => {
              //console.log("getterprofile: " + getter.contactNumber);
              this.profile.countryOfResidence = getter.countryOfResidence;
              this.profile.postalCode = getter.postalCode;
              this.profile.contactNumber = getter.contactNumber;
              this.profile.dateOfBirth = getter.dateOfBirth;
            }, (error) => {
              console.log("getProfile() error:", error);
            });
          },
          (error) => {
            //console.log("error in logging in user", error);

            this.profileService.getProfile().subscribe((getter: GetterProfile) => {
              //console.log("getterprofile: " + getter.contactNumber);
              this.profile.countryOfResidence = getter.countryOfResidence;
              this.profile.postalCode = getter.postalCode;
              this.profile.contactNumber = getter.contactNumber;
              this.profile.dateOfBirth = getter.dateOfBirth;            
            }, (error) => {
              console.log("getProfile() error:", error);
            });
          }
        );
      },
      (error) => {
        //console.log("error in first regi in user", error);
        // Always try to log in the user, even if registration failed
        this.loggedUser.email = this.profile.email;
        //console.log('loggedUser: ', this.loggedUser);
        this.profileService.loginProfile(this.loggedUser).subscribe(
          (loggedProfile) => {
            //console.log("success in logging in");
            //console.log("fetchedProfile: ");
          

            this.profileService.getProfile().subscribe((getter: GetterProfile) => {
              //console.log("getterprofile: " + getter.contactNumber);
              this.profile.countryOfResidence = getter.countryOfResidence;
              this.profile.postalCode = getter.postalCode;
              this.profile.contactNumber = getter.contactNumber;
              this.profile.dateOfBirth = getter.dateOfBirth;
            }, (error) => {
              console.log("getProfile() error:", error);
            });
          },
          (error) => {
            //console.log("error in logging in user", error);

            this.profileService.getProfile().subscribe((getter: GetterProfile) => {
              //console.log("getterprofile: " + getter.contactNumber);
              this.profile.countryOfResidence = getter.countryOfResidence;
              this.profile.postalCode = getter.postalCode;
              this.profile.contactNumber = getter.contactNumber;
              this.profile.dateOfBirth = getter.dateOfBirth;
            }, (error) => {
              console.log("getProfile() error:", error);
            });
          }
        );
      }
    );
  }

sucessNotification () {
  Swal.fire('Success!', 'Your profile was updated!', 'success');
}

onSubmit() {
      const userId = StorageUtil.sessionStorageRead('userId');
      if (typeof userId === 'string' && userId.length > 0) {
      // update existing profile
      this.profileService.saveProfile(userId, this.profile).subscribe(
        (savedProfile) => {
          // Handle success case
          //console.log("sucess in updating user");
        },
        (error) => {
          // Handle error case
          //console.log("error in updated user");
        }
      );
      } else {
      // create new profile
      this.profileService.updateProfile(this.profile).subscribe(
        (updatedProfile) => {
          StorageUtil.sessionStorageSave('mail', updatedProfile.email); // store user's mail in local storage
          // Handle success case
          //console.log("sucess in updating user");
        },
        (error) => {
          // Handle error case
          //console.log(this.profile);
          //console.log("error in updating user", error);
        }
      );
    }
  }
}
