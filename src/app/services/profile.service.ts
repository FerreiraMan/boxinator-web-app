import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
import { LoggedUser } from '../models/loggedUser';
import { InitialRegister } from '../models/initialRegis';

const { apiUsers } = environment;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    const url = `${apiUsers}/auth/current-user`;
    return this.http.get<Profile>(url, { withCredentials: true });
  }
  
  saveProfile(id: string, profile: Profile): Observable<Profile> {
    const url = `${apiUsers}/${id}`;
    return this.http.post<Profile>(url, profile);
  }

  loginProfile (loggedUser: LoggedUser): Observable<LoggedUser> {
    const url = `${apiUsers}/auth/login`;
    //console.log("update novo: user logged in");
    //console.log(loggedUser.email);
    return this.http.post<LoggedUser>(url, loggedUser, { withCredentials: true });   
  }

  initalRegistration (firstRegistration: InitialRegister): Observable<InitialRegister> {
    //console.log("registo inicial aqui");
    const url = `${apiUsers}/auth/register`;
    return this.http.post<InitialRegister>(url, firstRegistration);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    const url = `${apiUsers}/user/shipments/account/update`;
    return this.http.put<Profile>(url, profile, { withCredentials: true });
  }
}
