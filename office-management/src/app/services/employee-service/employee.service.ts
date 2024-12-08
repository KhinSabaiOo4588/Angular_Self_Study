import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee, Department } from '../../models/employee/employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEmployees(): Promise<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`).toPromise().then(data => data || []).catch(() => []);
  }

  getEmployee(id: string): Promise<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employees/${id}`).toPromise().then(data => {
      if (data) {
        return data;
      } else {
        throw new Error('Employee not found');
      }
    });
  }

  createEmployee(employee: Employee): Promise<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/employees`, employee).toPromise().then(data => {
      if (data) {
        return data;
      } else {
        throw new Error('Error creating employee');
      }
    });
  }

  updateEmployee(id: string, employee: Employee): Promise<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/employees/${id}`, employee).toPromise().then(data => {
      if (data) {
        return data;
      } else {
        throw new Error('Error updating employee');
      }
    });
  }

  deleteEmployee(id: number): Promise<void> {
    return this.http.delete<void>(`${this.baseUrl}/employees/${id}`).toPromise().catch(() => {
      throw new Error('Error deleting employee');
    });
  }

  getDepartments(): Promise<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/departments`).toPromise().then(data => data || []).catch(() => []);
  }

  getDepartment(id: string): Promise<Department> {
    return this.http.get<Department>(`${this.baseUrl}/departments/${id}`).toPromise().then(data => {
      if (data) {
        return data;
      } else {
        throw new Error('Department not found');
      }
    });
  }
  
  isEmailTaken(email: string): Observable<boolean> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees?email=${email}`).pipe(
      map(employees => employees.length > 0)
    );
  }

  checkEmail(email: string, employeeId?: string): Promise<boolean> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`).toPromise().then(employees => {
      if (!employees) {
        return false;
      }
      return employees.some(employee => employee.email === email && employee.id !== employeeId);
    });
  }

  // isEmailTaken(email: string): Promise<boolean> {
  //   return this.http.get<Employee[]>(`${this.baseUrl}/employees?email=${email}`)
  //     .toPromise()
  //     .then((employees: Employee[] | undefined) => {
  //       if (employees) {
  //         return employees.length > 0;
  //       } else {
  //         return false;
  //       }
  //     })
  //     .catch(() => false); // Handle any error in case the request fails
  // }
  
}
