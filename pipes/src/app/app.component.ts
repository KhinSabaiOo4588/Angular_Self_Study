import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  user = {
    name:'Aung Aung',
    role: 'Admin'
  }

  three = 3;

  message = "Hello Angular Pipes"

  today = new Date()

  data1 = 3.202917
  data2= 191717
  
}
