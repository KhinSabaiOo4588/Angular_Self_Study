/* moeminoo */

import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project-service/project.service';
import { Employee, Project } from '../../../services/project-service/project-models';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent {

  project: Project = {
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    projectManager: '',
    status: '',
    assignmentDate: '',
    employees: [],
    progress: 0,
    milestones: '',
    deadline: ''
  };

  newEmployee: Employee = { name: '', jobPosition: '' };
  isModalOpen: boolean = false;
  availableEmployees: Employee[] = [];
  isEditMode: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("ngOnInit is called");

    this.route.paramMap.subscribe(params => {
      this.isEditMode = params.get('mode') === 'edit';
    });
    this.loadProjectData();
  }

  loadProjectData() {
    console.log("loadProjectData is called");
    const projectId = this.route.snapshot.paramMap.get('id');
    console.log("projectId: ", projectId);
    if (projectId) {
      this.projectService.getProjectById(projectId)
        .then(project => {
          this.project = project;
          console.log("project: ", project);
          return this.projectService.getEmployees();
        })
        .then(employees => {
          this.availableEmployees = employees;
          console.log("availableEmployees: ", this.availableEmployees);
        })
        .catch(error => {
          console.error('Error loading project data:', error);
        });
    } else {
      this.projectService.getEmployees()
        .then(employees => {
          this.availableEmployees = employees;
          console.log("availableEmployees: ", this.availableEmployees);
        })
        .catch(error => {
          console.error('Error loading available employees:', error);
        });
    }
  }

  get projectManagers() {
    console.log("projectManagers() is called");
    return this.availableEmployees.filter(e => e.jobPosition === 'Project Manager');
  }

  get assignableEmployees() {
    console.log("assignableEmployees() is called");
    return this.availableEmployees.filter(e => e.jobPosition !== 'Project Manager');
  }

  openAddEmployeeModal() {
    console.log("openAddEmployeeModal() is called");
    this.newEmployee = { name: '', jobPosition: '' };
    this.isModalOpen = true;
  }

  closeAddEmployeeModal() {
    console.log("closeAddEmployeeModal() is called");
    this.isModalOpen = false;
  }

  addEmployee() {
    console.log("addEmployee() is called");
    if (this.newEmployee.name && this.newEmployee.jobPosition) {
      this.project.employees.push({ ...this.newEmployee });
      this.closeAddEmployeeModal();
      console.log("employees: ", this.project.employees)
    }
  }

  removeEmployee(index: number) {
    console.log("removeEmployee() is called")
    this.project.employees.splice(index, 1);
    console.log("employees: ", this.project.employees)
  }

  updateProject() {
    console.log("updateProject() is called")
    const projectId = this.route.snapshot.paramMap.get('id');
    console.log("projectId: ", projectId)
    if (projectId) {
      this.projectService.updateProject(projectId, this.project)
        .then(() => {
          this.router.navigate(['/home/project']);
        })
        .catch(error => {
          console.error('Error updating project:', error);
        });
    }
  }

  goToList() {
    this.router.navigate(['/home/project']);
  }

  onEmployeeSelect(event: any) {
    console.log("onEmployeeSelect() is called")
    const selectedEmployeeName = event.target.value;
    const selectedEmployee = this.assignableEmployees.find(e => e.name === selectedEmployeeName);
    console.log("selectedEmployee: ", selectedEmployee)
    if (selectedEmployee) {
      this.newEmployee.jobPosition = selectedEmployee.jobPosition;
      console.log("newEmployee role: ", this.newEmployee.jobPosition)
    }
  }


}
