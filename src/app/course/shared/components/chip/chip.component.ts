import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Author } from 'src/app/interfaces';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})

export class ChipComponent {
  @Input() author: Author;
  @Output() removeHandler = new EventEmitter<string>();
}
