import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
})
export class MyInputComponent {

  @Input()
  value: any = ''; 

  @Output()
  valueChange = new EventEmitter<any>(); 
}
