import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    this.authService.login();
    this.router.navigate(['/courses']);
  }
}
