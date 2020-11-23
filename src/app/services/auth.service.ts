import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token(): string {
    const expDate = moment(localStorage.getItem('app-token-exp'));
    if (moment() > moment(expDate)) {
      this.logout();
      return null;
    }
    return localStorage.getItem('app-token');
  }

  public login(): void {
    this.setToken('some value');
  }

  public logout(): void {
    this.setToken(null);
  }

  private setToken(value: string): void {
    if (value) {
      const expDate = moment().add(1, 'hour');
      localStorage.setItem('app-token', `${Math.random()}`);
      localStorage.setItem('app-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }
}
