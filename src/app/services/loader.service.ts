import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';
import { RefDirective } from '../directives/ref.directive';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private dir: RefDirective;

  constructor(private resolver: ComponentFactoryResolver) {}

  initDir(dir: RefDirective): void {
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
