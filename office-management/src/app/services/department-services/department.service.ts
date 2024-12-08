// By Thin Thin Oo 26/6/2024, For Department Service 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { Department } from '../../models/department/department.model';
import { Employee } from '../project-service/project-models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departmentUrl = 'http://localhost:3000/departments';
  private employeeUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}
// Method to retrieve departments with employees
getDepartmentsWithEmployees(): Promise<Department[]> {
  return firstValueFrom(
    this.http.get<Department[]>(`${this.departmentUrl}?_embed=employees`).pipe(
      catchError(this.handleError)
    )
  );
}
  // Method to retrieve departments
  getDepartments(): Promise<Department[]> {
    return firstValueFrom(
      this.http.get<Department[]>(this.departmentUrl).pipe(
        catchError(this.handleError)
      )
    );
  }
// Method to retrieve employees
getEmployees(): Promise<Employee[]> {
  return firstValueFrom(
    this.http.get<Employee[]>(this.employeeUrl).pipe(
      catchError(this.handleError)
    )
  );
}
  // Method to retrieve a department by id
  getDepartmentById(id: string): Promise<Department> {
    return firstValueFrom(
      this.http.get<Department>(`${this.departmentUrl}/${id}`).pipe(
        catchError(this.handleError)
      )
    );
  }

  // Method to create a new department
  createDepartment(department: Department): Promise<Department> {
    return firstValueFrom(
      this.http.post<Department>(this.departmentUrl, department).pipe(
        catchError(this.handleError)
      )
    );
  }

  // Method to update a department
  updateDepartment(id: string, department: Department): Promise<Department> {
    return firstValueFrom(
      this.http.put<Department>(`${this.departmentUrl}/${id}`, department).pipe(
        catchError(this.handleError)
      )
    );
  }

  // Method to delete a department
  deleteDepartment(id: string): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.departmentUrl}/${id}`).pipe(
        catchError(this.handleError)
      )
    );
  }

  // Error handling method
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
