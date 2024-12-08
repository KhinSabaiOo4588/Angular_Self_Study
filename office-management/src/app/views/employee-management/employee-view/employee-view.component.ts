//Author By @Khin Sabai Oo
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee-service/employee.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  employee: any = {};
  departmentName: string = '';
  defaultImageUrl: string = 'https://via.placeholder.com/150';
  statuses: string[] = ["Active", "Inactive", "On Leave", "Terminated", "Retired", "Probation", "Contract", "Resigned", "Training", "Suspended"];

  constructor(
    private empService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  // Lifecycle hook that is called after data-bound properties are initialized
  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.getEmployeeData(employeeId);
    }
  }

  // Fetch employee data based on the provided ID
  getEmployeeData(id: string): void {
    this.empService.getEmployee(id).then((data: any) => {
      this.employee = data;
      if (data.departmentId) {
        this.getDepartmentName(data.departmentId);
      }
    }).catch((error: HttpErrorResponse) => {
      console.error('Error fetching employee data:', error.message);
    });
  }

  // Fetch department name based on the department ID
  getDepartmentName(departmentId: string): void {
    this.empService.getDepartment(departmentId).then((data: any) => {
      this.departmentName = data.name;
      console.log("Department fetched successfully:", this.departmentName);
    }).catch((error: HttpErrorResponse) => {
      console.error('Error fetching department data:', error.message);
      if (error.status === 404) {
        console.error('Department not found');
        this.departmentName = 'Department not found';
      } else {
        console.error('An unexpected error occurred:', error);
        this.departmentName = 'Error fetching department';
      }
    });
  }

  // Check if the profile image is empty
  isProfileImageEmpty(): boolean {
    return !this.employee.profileImage || this.employee.profileImage.trim().length === 0;
  }

  // Navigate back to the previous location
  back() {
    this.location.back();
  }
}
