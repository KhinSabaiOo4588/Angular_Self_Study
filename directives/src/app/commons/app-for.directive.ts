import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appAppFor]',
})
export class AppForDirective implements OnChanges {
  @Input('appAppForIn') appAppIn: any; 
  @Input('appAppFor') shorthandInput: any; 

  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.container.clear();

    const data = this.appAppIn || this.shorthandInput;
    if (data) {
      Object.entries(data).forEach(([key, value], index) => {
        this.container.createEmbeddedView(this.template, {
          $implicit: value, 
          key, 
          index,
        });
      });
    }
  }
}
