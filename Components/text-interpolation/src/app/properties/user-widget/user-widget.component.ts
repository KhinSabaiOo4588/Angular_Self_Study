import { Component, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.css']
})
export class UserWidgetComponent {

  @Input("data")
  user?:User

  @Input()
  title?:string
}
