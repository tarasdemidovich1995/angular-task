import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() title: string;
  @Input() text: string;
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() reject: EventEmitter<void> = new EventEmitter<void>();
}
