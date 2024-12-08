// <!-- By Thin Thin Oo 26/6/2024, For View Department Component  -->
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../models/department/department.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentService } from '../../../services/department-services/department.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule]
})
export class ViewDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  isEditMode: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.departmentForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      title: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      canAccessData: [false]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const mode = params['mode'];
      this.isEditMode = mode === 'edit';
      if (id) {
        this.loadDepartment(id);
      }
    });
  }


  loadDepartment(id: string): void {
    this.departmentService.getDepartmentById(id).then(department => {
      console.log('Fetched Department:', department);
      this.departmentForm.patchValue(department);
      console.log('Form Value after patching:', this.departmentForm.value);
    }).catch(error => {
      this.error = 'Failed to load department';
      console.error('Error loading department', error);
    });
  }

  updateDepartment(): void {
    if (this.departmentForm.valid) {
      const departmentData: Department = this.departmentForm.value;
      this.departmentService.updateDepartment(departmentData.id!, departmentData)
        .then(() => {
          alert('Department Update successful.');
          this.router.navigate(['/home/department']);
        })
        .catch(error => {
          this.error = 'Failed to update department';
          console.error('Error updating department', error);
        });
    }
  }

  onCancel(): void {
    this.router.navigate(['/home/department']);
  }
}
