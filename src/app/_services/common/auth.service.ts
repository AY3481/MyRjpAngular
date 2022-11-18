import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { User } from '../../models/user';
import { Api } from '../../_helpers/api';

const TOKEN_KEY = 'JWT_TOKEN';

@Injectable()
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  //userProfile = new BehaviorSubject<any>(null);

  get isLoggedIn() {
    return this.loggedIn.asObservable();                  // {2}
  }

  constructor(private router: Router, private api: Api) { }

  login(user: User): Observable<any> {
    if (user.userName !== '' && user.password != '' ) {   // {3}
      return this.api.post("User/Login", user);
      //this.loggedIn.next(true);
      //this.router.navigate(['/']);
    }
    return of(null);
  }

  logout() {                                              // {4}
    //this.loggedIn.next(false);
    this.clearToken();
    this.router.navigate(['/login']);
  }

  redirectSecured() {
    this.loggedIn.next(true);
    this.router.navigate(['/']);
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken() {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  clearToken(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);    
  }
  /************************************************ */
}
