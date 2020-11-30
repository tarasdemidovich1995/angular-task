import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent {
  @Input() text: string;
  @Output() onClick = new EventEmitter<boolean>();
  public isOn = false;

  public toggle(): void {
    this.isOn = !this.isOn;
    this.onClick.emit(this.isOn);
  }
}
