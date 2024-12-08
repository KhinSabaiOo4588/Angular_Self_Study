/* moeminoo */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Employee, Project } from './project-models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectUrl = 'http://localhost:3000/projects'; // projectUrl
  private employeeUrl = 'http://localhost:3000/employees'; // employeeUrl

  constructor(private http: HttpClient) {}

  // to retrieve employees by mmo
  getEmployees(): Promise<Employee[]> {
    return firstValueFrom(this.http.get<Employee[]>(this.employeeUrl));
  }

  // to retrieve projects by mmo
  getProjects(): Promise<Project[]> {
    return firstValueFrom(this.http.get<Project[]>(this.projectUrl));
  }

  // to retrieve project by id by mmo
  getProjectById(id: string): Promise<Project> {
    return firstValueFrom(this.http.get<Project>(`${this.projectUrl}/${id}`));
  }
  

  // to create project by mmo
  createProject(project: Project): Promise<Project> {
    return firstValueFrom(this.http.post<Project>(this.projectUrl, project));
  }

  // to update projects by mmo
  updateProject(id: string, project: Project) : Promise<Project> {
    return firstValueFrom(this.http.put<Project>(`${this.projectUrl}/${id}` ,project))
  }

  // to delete project by mmo
  deleteProject(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.projectUrl}/${id}`))
  }
}
