import { ComponentFactoryResolver, Injectable } from '@angular/core';

import { RefDirective } from 'src/app/shared/directives/ref.directive';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private dir: RefDirective;

  constructor(private resolver: ComponentFactoryResolver) {}

  public initDir(dir: RefDirective): void {
    this.dir = dir;
  }

  public showLoader(): void {
    this.dir.containerRef.clear();
    const modalFactory = this.resolver.resolveComponentFactory(LoaderComponent);
    this.dir.containerRef.createComponent(modalFactory);
  }

  public hideLoader(): void {
    this.dir.containerRef.clear();
  }
}
