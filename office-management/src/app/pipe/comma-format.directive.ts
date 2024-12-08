import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCommaFormat]',
  standalone: true
})
export class CommaFormatDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/,/g, '');

    if (!isNaN(Number(value))) {
      value = this.formatNumber(value);
      this.control.control?.setValue(value, { emitEvent: false });
    }
  }

  private formatNumber(value: string): string {
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
