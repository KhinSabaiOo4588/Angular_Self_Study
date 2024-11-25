import { Component } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {

  status = false;

  viewCode = 0

  title = "User Detail"

  aung:User = {
    name: 'Aung Aung',
    phone: '09444555666',
    email: 'aung@gmail.com'
  }
}
