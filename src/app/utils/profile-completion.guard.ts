import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfilePageComponent } from '../pages/profile-page/profile-page.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileCompletionGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private profilePage: ProfilePageComponent) { }
  
    canActivate(): boolean {

      if (this.router.url !== '/profile') {
        return true; // Allow navigation
      }
      
      const postalCode = (<HTMLInputElement>document.getElementById('postalCode')).value;
      const contactNumber = (<HTMLInputElement>document.getElementById('contactNumber')).value;
      let message = 'Please update the following field(s): ';
    
      if (postalCode === '' && contactNumber === '') {
        message += 'Postal Code and Contact Number';
      } else if (postalCode === '') {
        message += 'Postal Code';
      } else if (contactNumber === '') {
        message += 'Contact Number';
      } else {
        return true;
      }
    
      Swal.fire(message);
      this.router.navigate(['/profile']);
      return false;
    }
    
}
