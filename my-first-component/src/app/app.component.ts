import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Angular Test';

  language = ['Java','Angular','React','Flutter'];

  divider = "Upper are test for angular component";
}
