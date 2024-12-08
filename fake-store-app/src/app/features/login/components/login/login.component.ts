import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private apiService: ApiService) {}

  async login() {
    const response = await this.apiService.post('auth/login', {
      username: this.username,
      password: this.password,
    });
    console.log('Login successful:', response);
  }
}
