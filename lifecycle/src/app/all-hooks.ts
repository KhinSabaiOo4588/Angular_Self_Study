import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    DoCheck,
    OnChanges,
    OnDestroy,
    OnInit,
    Directive,
    SimpleChanges,
  } from '@angular/core';
  
  export interface AllHooks
    extends OnInit,
      OnChanges,
      DoCheck,
      AfterContentInit,
      AfterContentChecked,
      AfterViewInit,
      AfterViewChecked,
      OnDestroy {}
  
  @Directive()
  export class BaseLoggerComponent implements AllHooks {
    constructor(protected loggable: boolean = true, protected title: string = '') {
      this.log('constructor');
    }
  
    ngAfterContentChecked(): void {
      this.log('Method ngAfterContentChecked.');
    }
  
    ngAfterViewInit(): void {
      this.log('Method ngAfterViewInit.');
    }
  
    ngAfterViewChecked(): void {
      this.log('Method ngAfterViewChecked.');
    }
  
    ngOnDestroy(): void {
      this.log('Method ngOnDestroy.');
    }
  
    ngAfterContentInit(): void {
      this.log('Method ngAfterContentInit.');
    }
  
    ngDoCheck(): void {
      this.log('Method ngDoCheck');
    }
  
    ngOnInit(): void {
      this.log('Method ngOnInit');
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      this.log('Method ngOnChanges');
    }
  
    protected log(name: string): void {
      if (this.loggable) {
        console.log(`====== ${this.title.padEnd(16, ' ')} : ${name.padEnd(16, ' ')} =====`);
      }
    }
  }
  