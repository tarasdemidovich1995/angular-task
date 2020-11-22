import { Component } from '@angular/core';

@Component({
  selector: 'app-fake-logo',
  template: `
    <div class="logo">
      <i class="material-icons logo__icon">play_circle_outline</i>
      <a class="logo__title" [routerLink]="['/course']">video course</a>
    </div>
  `,
  styles: [
    `
      .logo {
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #ffffff;
      }
      .logo__icon.material-icons {
        margin-right: 5px;
        font-size: 28px;
        color: #40979e;
      }
      .logo__title {
        text-transform: uppercase;
        font-weight: bold;
        color: #fff;
        text-decoration: none;
      }
    `,
  ],
})
export class FakeLogoComponent {}
