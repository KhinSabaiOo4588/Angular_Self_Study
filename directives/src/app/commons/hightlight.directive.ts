import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHightlight]'
})
export class HightlightDirective implements OnChanges{

  @Input()
  appHightlight: string = ''

  @Input()
  textColor:string = ''

  constructor(private eleRef:ElementRef, private render:Renderer2) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render.setStyle(this.eleRef.nativeElement,'padding','20px')
    this.render.setStyle(this.eleRef.nativeElement,'background-color', this.appHightlight || 'silver')
    this.render.setStyle(this.eleRef.nativeElement,'color',this.textColor || 'yellow')
  }

  @HostListener('mouseenter')
  mouseIn(){
    this.render.setStyle(this.eleRef.nativeElement,'font-size','40px')
  }

  @HostListener('mouseleave')
  mouseOut(){
    this.render.removeStyle(this.eleRef.nativeElement,'font-size')
  }

}
