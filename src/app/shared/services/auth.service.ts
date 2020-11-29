import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';

import { ActionPayload, AuthRequest, AuthResponse, User, UserResponse } from 'src/app/interfaces';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertState } from '../store/alert/alert.reducers';
import { AlertActionTypes } from '../store/alert/alert.actions';
import { AuthState } from '../store/auth/auth.reducers';
import { AuthActionsType } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private store$: Store<AlertState | AuthState>,
    private router: Router,
  ) {}

  get token(): string {
    const expDate = moment(localStorage.getItem('app-token-exp'));
    if (moment() > moment(expDate)) {
      this.logout();
      this.store$.dispatch(new ActionPayload(AlertActionTypes.DANGER, 'Token time out'));
      return null;
    }
    return localStorage.getItem('app-token');
  }

  public login(res1: AuthResponse): Observable<User> {
    return this.http.post<AuthRequest>(`${environment.apiUrl}/auth/login`, res1).pipe(
      delay(1000),
      tap(this.setToken),
      switchMap((res2) => this.getUser.call(this, res2)),
      tap((user: User) => {
        this.store$.dispatch(new ActionPayload(AuthActionsType.UPDATE_USER, user));
      }),
      catchError(this.errorHandler.bind(this))
    );
  }

  public logout(): void {
    this.setToken(null);
    this.store$.dispatch(new ActionPayload(AuthActionsType.CLEAR_USER));
    this.router.navigate(['/login']);
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
    this.store$.dispatch(new ActionPayload(AlertActionTypes.DANGER, error.error));
    return throwError(error);
  }
}
