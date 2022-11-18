import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/take';
import { AuthService } from '../_services/common/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router    
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      let canLogin: boolean = false;

      if (sessionStorage.getItem("JWT_TOKEN") != null){
        canLogin = true;        
      }
      else {
        this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {        // {1}
          if (!isLoggedIn) {                                                    // {2}
            this.router.navigate(['/login']);                                   // {3}
            canLogin = false;
          }
          canLogin = true;
        });
      }

      return canLogin;          

      // return this.authService.isLoggedIn       // {1}
      // .take(1)                               // {2} 
      // .map((isLoggedIn: boolean) => {        // {3}
      //   if (!isLoggedIn){
      //     this.router.navigate(['/login']);  // {4}
      //     return false;
      //   }
      //   return true;
      // });

      // alert(this.authService.isLoggedIn);
      // if (this.authService.isLoggedIn) {
      //   return true;
      // } else {        
      //   //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      //   this.router.navigate(['/login']);
      //   return false;
      // }

  }
}
