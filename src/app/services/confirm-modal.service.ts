import { ComponentFactoryResolver, Injectable, ViewChild } from '@angular/core';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { RefDirective } from '../directives/ref.directive';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  private dir: RefDirective;

  constructor(private resolver: ComponentFactoryResolver) {}

  initDir(dir: RefDirective): void {
    this.dir = dir;
  }

  showModal(title: string, confirm: () => void): void {
    const modalFactory = this.resolver.resolveComponentFactory(ConfirmModalComponent);
    const component = this.dir.containerRef.createComponent(modalFactory);
    component.instance.title = title;
    component.instance.confirm.subscribe(() => {
      confirm();
      this.dir.containerRef.clear();
    });
    component.instance.reject.subscribe(() => {
      this.dir.containerRef.clear();
    });
  }
}
