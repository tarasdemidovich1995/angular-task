import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public path: string;
  private rSub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rSub = this.route.url.subscribe((_: any) => {
      const { fragment } = this.route.snapshot;
      this.path = fragment
        ? window.location.hash.slice(2).replace(/\/.*#.*/g, '') + '/' + fragment
        : window.location.hash.slice(2);
    });
  }

  ngOnDestroy(): void {
    this.rSub.unsubscribe();
  }

}
