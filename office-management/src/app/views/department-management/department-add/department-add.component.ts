// <!-- By Thin Thin Oo 26/6/2024, For Add Department Component  -->
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Department } from '../../../models/department/department.model';
import { CamelCasePipe } from "../../../pipe/camel-case.pipe";
import { DepartmentService } from '../../../services/department-services/department.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, CamelCasePipe]
})
export class DepartmentAddComponent {
  departmentForm: FormGroup;
  isAdding: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      canAccessData: [false]
    });
  }

  addDepartment(): void {
    if (this.departmentForm.valid) {
      console.log('Form is valid, starting to add department');
      this.isAdding = true;
      const newDepartment: Department = this.departmentForm.value;
      console.log('New Department Data:', newDepartment);

      this.departmentService.createDepartment(newDepartment)
        .then(() => {
          console.log('Department successfully added');
          this.isAdding = false;
          this.router.navigate(['/home/department']);
        })
        .catch((error: any) => {
          console.error('Error adding department:', error);
          this.isAdding = false;
          this.error = 'Error adding department: ' + error.message;
        });
    } else {
      console.warn('Form is invalid, cannot add department');
    }
  }
  onCancel(): void {
    this.router.navigate(['/home/department']);
  }
}
