import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActionPayload } from 'src/app/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertActionTypes } from '../store/alert/alert.actions';
import { AlertState } from '../store/alert/alert.reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store$: Store<AlertState>
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
      this.store$.dispatch(new ActionPayload(AlertActionTypes.WARNING, 'Please pass the authorization'));
    }
  }
}
