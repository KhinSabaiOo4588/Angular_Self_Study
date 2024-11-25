import { Component } from '@angular/core';

@Component({
  selector: 'app-structural',
  templateUrl: './structural.component.html',
  styleUrls: ['./structural.component.css'],
})
export class StructuralComponent {
  student = {
    name: 'Aung Aung',
    phone: '09888777666',
    email: 'aung@gmail.com',
  };
}
