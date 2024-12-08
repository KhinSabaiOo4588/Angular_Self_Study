import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  badGuys: string[] = ['admin', 'root', 'superuser'];
  courses = ['Java Basic', 'Spring', 'Angular', 'React'];

  // Array to store submitted form data
  formData: any[] = [];

  // Method to handle form submission
  onFormSubmit(data: any) {
    this.formData.push(data); // Add the form data to the array
    console.log(this.formData); // Optional: Log the form data to the console
  }
}
