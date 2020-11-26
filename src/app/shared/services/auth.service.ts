import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { AlertService } from 'src/app/shared/services/alert.service';
import { environment } from 'src/environments/environment';

import { AuthRequest, AuthResponse, User, UserResponse } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;

  constructor(private http: HttpClient, private alertService: AlertService) {}

  get token(): string {
    const expDate = moment(localStorage.getItem('app-token-exp'));
    if (moment() > moment(expDate)) {
      this.logout();
      this.alertService.danger('Token time out');
      return null;
    }
    return localStorage.getItem('app-token');
  }

  public login(res1: AuthResponse): Observable<User> {
    return this.http.post<AuthRequest>(`${environment.apiUrl}/auth/login`, res1).pipe(
      delay(1000),
      tap(this.setToken),
      switchMap((res2) => this.getUser.call(this, res2)),
      tap((user: User) => { this.user = user; }),
      catchError(this.errorHandler.bind(this))
    );
  }

  public logout(): void {
    this.setToken(null);
    this.user = null;
  }

  private setToken(req: AuthRequest | null): void {
    if (req) {
      const expDate = moment().add(1, 'hour');
      localStorage.setItem('app-token', req.token);
      localStorage.setItem('app-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  public getUser(res: UserResponse | AuthRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/userinfo`, res);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  private errorHandler(error: HttpErrorResponse): Observable<void> {
    this.alertService.danger(error.error);
    return throwError(error);
  }
}
