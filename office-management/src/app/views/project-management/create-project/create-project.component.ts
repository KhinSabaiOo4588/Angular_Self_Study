/* moeminoo */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project-service/project.service';
import { Router } from '@angular/router';
import { Employee } from '../../../services/project-service/project-models';


@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {

  projectForm: FormGroup;
  availableEmployees: Employee[] = [];
  isModalOpen: boolean = false;
  newEmployee: FormGroup;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      projectManager: ['', Validators.required],
      status: ['', Validators.required],
      assignmentDate: ['', Validators.required],
      employees: this.fb.array([]),
      progress: [0],
      milestones: [''],
      deadline: ['', Validators.required]
    });

    this.newEmployee = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadEmployees();
  }

  // to get employees to assign in project
  get employees(): FormArray {
    return this.projectForm.get('employees') as FormArray;
  }

  // to get allEmployees
  loadEmployees() {
    this.projectService.getEmployees().then(employees => {
      this.availableEmployees = employees;
      console.log("availableEmployees: ", this.availableEmployees)
    }).catch(error => {
      console.error('Error loading employees', error);
    });
  }


  // to show projectManagers
  get projectManagers() {
    return this.availableEmployees.filter(e => e.jobPosition === 'Project Manager');
  }

  // to show assignableEmployees
  get assignableEmployees() {
    return this.availableEmployees.filter(e => e.jobPosition !== 'Project Manager');
  }


  // to open modal
  openAddEmployeeModal() {
    console.log("openAddEmployeeModal is called")
    this.newEmployee.reset();
    this.isModalOpen = true;
  }

  // to close modal
  closeAddEmployeeModal() {
    console.log("closeAddEmployeeModal is called")
    this.isModalOpen = false;
  }

  // to add employee
  addEmployee() {
    if (this.newEmployee.valid) {
      this.employees.push(this.fb.group(this.newEmployee.value));
      console.log("employees: ", this.employees)
      this.closeAddEmployeeModal();
    }
  }

  // to remove employee
  removeEmployee(index: number) {
    this.employees.removeAt(index);
  }

  // to create project
  createProject() {
    console.log("createProject: is called")
    if (this.projectForm.valid) {
      console.log("Value: ", this.projectForm.value)
      this.projectService.createProject(this.projectForm.value).then(() => {
        console.log('Project created successfully');
        this.projectForm.reset();
        this.employees.clear();
      }).catch(error => {
        console.error('Error creating project', error);
      });
      this.router.navigate(['/project']);
    }
  }

  // to select employee
  onEmployeeSelect(event: any) {
    console.log("onEmployeeSelect is called")
    const selectedEmployeeName = event.target.value;
    console.log("selectedEmployeeName: ", selectedEmployeeName)
    const selectedEmployee = this.assignableEmployees.find(e => e.name === selectedEmployeeName);
    console.log("selectedEmployee: ", selectedEmployee)
    if (selectedEmployee) {
      this.newEmployee.get('role')?.setValue(selectedEmployee.jobPosition);
    }
  }
}
