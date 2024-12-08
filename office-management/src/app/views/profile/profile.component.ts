// @khinSabalOo

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment.development';
import { EmployeeService } from '../../services/employee-service/employee.service';
import { Employee } from '../../models/employee/employee.model';

const api = environment.apiUrl;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, NgbModule]
})
export class ProfileComponent {

  private apiUrl = `${api}/employees`;

  id = localStorage.getItem('id');
  defaultImageUrl: string = 'https://via.placeholder.com/150';
  employee!: Employee
  constructor(private employeeService: EmployeeService) {
    
  }
  ngOnInit(): void {
    this.employeeService.getEmployee(this.id as any).then((data) => {
      this.employee = data;
      console.log(this.employee)
   })
  }


  isProfileImageEmpty(): boolean {
    return !this.employee.profileImage || this.employee.profileImage.trim().length === 0;
  }

 

}