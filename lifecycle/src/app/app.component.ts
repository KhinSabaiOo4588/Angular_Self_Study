import { Component } from '@angular/core';
import { BaseLoggerComponent } from './all-hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends BaseLoggerComponent {

  simpleString: any 
  objectValue = {data:''}

  arrayValue:string[]=[]

  constructor() {
    super(false, 'AppComponent'); 
    this.log('Constructor')
  }

  setMessage(input:any){
    this.simpleString = input.value
    this.objectValue = {data:input.value}
    this.arrayValue = [...this.arrayValue, input.value]
    input.value = ''
  }
}
