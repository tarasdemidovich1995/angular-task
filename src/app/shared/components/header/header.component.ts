import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { lang } from 'moment';
import { LANGUAGES } from 'src/app/config';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public currentLanguage = LANGUAGES[0];

  constructor(
    public authService: AuthService,
    private translateService: TranslateService,
    private router: Router,
  ) {}

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public toggleLanguage(isOn: boolean): void {
    this.currentLanguage = LANGUAGES[+isOn];
    this.translateService.use(this.currentLanguage);
  }
}
