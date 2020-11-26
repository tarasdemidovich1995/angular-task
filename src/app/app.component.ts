import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RefDirective } from 'src/app/shared/directives/ref.directive';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(RefDirective) modalDir: RefDirective;

  constructor(
    private confirmModalService: ConfirmModalService,
    private loaderService: LoaderService
  ) {}

  public ngAfterViewInit(): void {
    this.confirmModalService.initDir(this.modalDir);
    this.loaderService.initDir(this.modalDir);
  }

}
