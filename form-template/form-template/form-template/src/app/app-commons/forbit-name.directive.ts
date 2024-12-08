import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appForbitName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbitNameDirective,
      multi: true,
    },
  ],
})
export class ForbitNameDirective implements Validator {
  @Input() appForbitName: string[] = [];

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    for (const badGuy of this.appForbitName) {
      if (badGuy === control.value) {
        return { forbitten: `${badGuy} cannot register on this site.` };
      }
    }
    return null;
  }
}
