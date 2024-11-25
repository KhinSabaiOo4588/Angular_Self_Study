import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHello]'
})
export class HelloDirective {

  constructor(eleRef: ElementRef) { 
    eleRef.nativeElement.style = 'padding: 10px; background-color:silver;'
  }

}
