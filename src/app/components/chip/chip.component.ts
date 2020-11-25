import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from 'src/app/interfaces';

@Component({
  selector: 'app-chip',
  template: `
    <div class="chip">
      <div class="chip__name">
        <h3>{{author.name}}</h3>
      </div>
      <button
        class="btn btn_chip"
        (click)="removeHandler.emit(author.id)"
      >
        <i class="material-icons btn_chip__icon">close</i>
      </button>
    </div>
  `,
  styles: [`
    .chip {
      width: auto;
      padding-left: 10px;
      height: 24px;
      border-radius: 18px;
      background-color: #b4b4b4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 2px 0 rgba(29, 30, 38, 0.1),
        0 2px 5px 0 rgba(29, 30, 38, 0.15);
      margin: 5px;
    }
    .chip__name {
      font-size: 12px;
      margin-right: 10px;
      color: #474A59;
    }
  `]
})
export class ChipComponent {
  @Input() author: Author;
  @Output() removeHandler = new EventEmitter<string>();
}
