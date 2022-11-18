import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/common/auth.service';

@Injectable()
export class ProfileResolve implements Resolve<any> {

  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot) {
    //this.authService.getProfileInfo();
    //return this.authService.userProfile;
    return true;
  }
}