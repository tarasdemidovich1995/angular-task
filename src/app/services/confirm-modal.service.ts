import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
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

  showModal(title: string, text: string, confirm: Observable<void>): void {
    this.dir.containerRef.clear();
    const modalFactory = this.resolver.resolveComponentFactory(ConfirmModalComponent);
    const component = this.dir.containerRef.createComponent(modalFactory);
    component.instance.title = title;
    component.instance.text = text;
    component.instance.isDisabled = false;
    component.instance.confirm.pipe(
      tap(() => { component.instance.isDisabled = true; }),
      switchMap(() => confirm)
    ).subscribe(() => {
      this.dir.containerRef.clear();
    });
    component.instance.reject.subscribe(() => {
      this.dir.containerRef.clear();
    });
  }
}
