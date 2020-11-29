import { Component, EventEmitter, Input, Output } from '@angular/core';
import { COURSES_ON_PAGE } from 'src/app/config';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() activePage: number;
  @Input() elemsCount: number;
  @Output() clickHandler = new EventEmitter<number>();
  public elemsPerPage = COURSES_ON_PAGE;
}
