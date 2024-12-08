//han naung soe && myo thu aung
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee/employee.model';
import { environment } from '../../../environments/environment.development';

const api = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${api}/employees`;

  constructor(private router: Router, private http: HttpClient) { }

  // Random token generator for token @Moe Min Oo
  private tokenChar: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_+$';
  randomToken() {
    let token: string = '';
    for (let i = 0; i < 10; i++) {
      token += this.tokenChar.charAt(
        Math.floor(Math.random() * this.tokenChar.length)
      );
    }
    return token;
  }

  // Checking login form value
  login(email: string, password: string): Promise<boolean> {
    console.log('Login is called with email:', email);
    return new Promise((resolve, reject) => {
      this.http.get<Employee[]>(this.apiUrl).subscribe(
        (employees: Employee[]) => {
          console.log('Fetched employees:', employees);
          const employee = employees.find(
            (emp) => emp.email === email && emp.password === password
          );
          if (employee) {
            console.log('Employee found:', employee);
            localStorage.setItem('userName', employee.name);
            localStorage.setItem('userEmail', employee.email);
            localStorage.setItem('token', this.randomToken());
            localStorage.setItem('id', employee.id);
            localStorage.setItem('imgUrl', employee.profileImage);
            resolve(true);
          } else {
            console.log('Employee not found');
            resolve(false);
          }
        },
        (error) => {
          console.error('Error fetching employees:', error);
          reject(error);
        }
      );
    });
  }

  // Logout service removing from local storage items
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}