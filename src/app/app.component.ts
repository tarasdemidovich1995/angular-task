import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RefDirective } from './directives/ref.directive';
import { ConfirmModalService } from './services/confirm-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(RefDirective) modalDir: RefDirective;

  constructor(private confirmModalService: ConfirmModalService) {}

  ngAfterViewInit(): void {
    this.confirmModalService.initDir(this.modalDir);
  }

}
