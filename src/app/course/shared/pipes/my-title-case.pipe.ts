import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myTitleCase'
})
export class MyTitleCasePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/(^\w)|((?<=\/)\w)/gi, (match) => match.toUpperCase());
  }

}
