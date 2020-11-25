import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagesArr'
})
export class PagesArrPipe implements PipeTransform {

  transform(count: number, elemsPerPage: number): number[] {
    return new Array(Math.ceil(count / elemsPerPage)).fill(1).map((_, index) => index);
  }

}
