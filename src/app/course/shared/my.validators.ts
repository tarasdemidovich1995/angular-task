import { FormControl } from '@angular/forms';

export class MyValidators {
  static atLeastOneLength(control: FormControl): { [key: string]: boolean } {
    if (control.value.length < 1) {
      return { atLeastOneLength: true };
    }
    return null;
  }
}
