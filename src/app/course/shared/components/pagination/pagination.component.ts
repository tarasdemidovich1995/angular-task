import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() activePage: number;
  @Input() elemsPerPage: number;
  @Input() elemsCount: number;
  @Output() clickHandler = new EventEmitter<number>();
}
