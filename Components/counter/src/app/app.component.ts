import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conter Component';
  count=0;

  countDown(){
    this.count--;
  }

  countUp(){
    this.count++;
  }
  
}
