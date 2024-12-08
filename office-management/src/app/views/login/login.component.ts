// myo thu aung && han naung soe && moe min oo
import { Component, NgModule } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-guard/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // To handle password show/hide
  togglePassword() {
    console.log('togglePassword is called:');
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const eyeIcon = passwordInput.nextElementSibling
      ?.nextElementSibling as HTMLElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.classList.remove('bi-eye-slash');
      eyeIcon.classList.add('bi-eye');
    } else {
      passwordInput.type = 'password';
      eyeIcon.classList.remove('bi-eye');
      eyeIcon.classList.add('bi-eye-slash');
    }
  }

  //to handle toggle show and hide
  toggleNavbar() {
    var navbarNav = document.getElementById('navbarNav');
    navbarNav?.classList.toggle('show');
  }

  // To handle submit and route
  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(email, password).then((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/home']);
        } else {
          console.error('Login failed');
        }
        console.log(this.form.value);
      });
    }
  }
}