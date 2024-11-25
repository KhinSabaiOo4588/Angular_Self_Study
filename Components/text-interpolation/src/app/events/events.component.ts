import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  message:string = ''

  values?: string

  onKeyup(event:any){
    this.message = event.target.value
  }
 }
