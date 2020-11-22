import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = false;

  constructor() {}

  login(): void {
    this.isAuth = true;
  }

  logout(): void {
    this.isAuth = false;
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }
}
