import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public nickname = '';
  public password = '';
  public isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    this.isLoading = true;
    this.authService.login({
      login: this.nickname,
      password: this.password
    }).subscribe(() => {
      this.router.navigate(['/courses']);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }
}
