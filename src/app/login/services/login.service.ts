import { Injectable } from '@angular/core';
import { GlobalServiceService } from '../../../app/global-service.services';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private globalService: GlobalServiceService) {}

  getToken(email: string, password: string) {
    this.globalService.getToken(email, password).subscribe(() => {
        console.log('Token:', this.globalService.token); 
      });
  }
}