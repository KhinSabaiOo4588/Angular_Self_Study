/* moeminoo */

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../pagination/pagination.component';
import { ProjectService } from '../../../services/project-service/project.service';


interface Project {
  id?: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: string;
  status: string;
}

@Component({
  selector: 'app-project-list',
  imports: [RouterModule, RouterLink, RouterLinkActive, PaginationComponent, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  standalone: true
})
export class ProjectListComponent {

  projects: Project[] = [];
  paginatedProjects: Project[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15];
  searchQuery: string = '';

  constructor(private http: HttpClient, private router: Router, private pjService: ProjectService) { }

  ngOnInit(): void {
    this.pjService.getProjects().then(data => {
      this.projects = data;
      console.log("projects: ", this.projects)
      this.updatePaginatedItems();
    }).catch(error => {
      console.log("Error get Projects", error);
    })
  }

  updatePaginatedItems() {
    const filteredProjects = this.searchQuery
      ? this.projects.filter(project =>
        Object.values(project).some(val =>
          val !== null && val !== undefined && val.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
      : this.projects;

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProjects = filteredProjects.slice(start, end);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  onItemsPerPageChanged(event: Event) {
    const newItemsPerPage = Number((event.target as HTMLSelectElement).value);
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1;
    this.updatePaginatedItems();
  }

  onSearchQueryChanged(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.updatePaginatedItems();
  }

  // call addProject field
  addProject() {
    console.log('Add Project button clicked');
    this.router.navigate(['/home/project/create-project']);
  }


  // call edit field

  viewProject(project: Project, readonly: boolean) {
    const mode = readonly ? 'view' : 'edit';
    this.router.navigate(['/home/project/update-project', project.id, mode]);
    console.log('Project button clicked', project);
  }

  editProject(project: Project) {
    this.viewProject(project, false);
  }

  // viewProject(project: Project) {
  //   this.router.navigate(['/project/update-project', project, { mode: 'view' }]);
  // }

  // editProject(project: Project) {
  //   this.router.navigate(['/project/update-project', project, { mode: 'edit' }]);
  // }

  // call delete function
  deleteProject(projectId: number) {
    this.pjService.deleteProject(projectId).then(() => {
      this.projects = this.projects.filter(project => project.id !== projectId);
      console.log('After Deletion, the projects ', this.projects);
      this.updatePaginatedItems();
    }
    )
  }
}
