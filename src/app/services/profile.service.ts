import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';

const { apiUsers } = environment;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  getProfile(id: string): Observable<Profile> {
    const url = `${apiUsers}/${id}`;
    return this.http.get<Profile>(url);
  }

  saveProfile(id: string, profile: Profile): Observable<Profile> {
    const url = `${apiUsers}/${id}`;
    return this.http.post<Profile>(url, profile);
  }

  createProfile(profile: Profile): Observable<Profile> {
    const url = `${apiUsers}`;
    return this.http.post<Profile>(url, profile);
  }
}
