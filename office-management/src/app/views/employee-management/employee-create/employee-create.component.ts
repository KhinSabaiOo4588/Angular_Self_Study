/* Author By @Khin Sabai Oo*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../../../services/employee-service/employee.service';
import { CamelCasePipe } from '../../../pipe/camel-case.pipe';
import { CommaFormatDirective } from '../../../pipe/comma-format.directive';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CamelCasePipe, CommaFormatDirective],
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})

export class EmployeeCreateComponent implements OnInit {
  employeeForm: FormGroup;
  departments: any[] = [];
  imageUrl: string | ArrayBuffer | null = 'https://via.placeholder.com/150';
  showPassword = false;
  showConfirmPassword = false;
  educationLevels: string[] = ["Bachelor's", "Master's", "PhD"];
  roles: string[] = ["Admin", "Manager", "Employee"];
  statuses: string[] = ["Active", "Inactive", "On Leave", "Terminated", "Retired", "Probation", "Contract", "Resigned", "Training", "Suspended"];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router,
    private location: Location
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9\s]*$/)]],
      jobPosition: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email], [this.emailNotTakenValidator()]],
      workPhone: ['', [Validators.required, Validators.pattern(/^(09|\+?950?9|95950?9)\d{7,9}$/)]],
      workMobile: ['', [Validators.required, Validators.pattern(/^(09|\+?950?9|95950?9)\d{7,9}$/)]],
      dob: ['', [Validators.required, this.validateDOB]],
      gender: [''],
      address: ['', Validators.required],
      education: [''],
      departmentId: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      status: ['Active', Validators.required],
      profileImage: [null],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{6,}$')
      ]],
      confirmPassword: ['', [Validators.required]],
      role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    // Apply the camel case transformation on input change
    this.employeeForm.get('name')?.valueChanges.subscribe(value => {
      this.employeeForm.patchValue({ name: this.camelCase(value) }, { emitEvent: false });
    });
    this.employeeForm.get('jobPosition')?.valueChanges.subscribe(value => {
      this.employeeForm.patchValue({ jobPosition: this.camelCase(value) }, { emitEvent: false });
    });
  }

  /** Lifecycle hook that is called after data-bound properties are initialized */
  ngOnInit() {
    this.empService.getDepartments().then((data: any) => {
      this.departments = data;
    });
  }

  /** Handles the image change event to update the profile image */
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.employeeForm.patchValue({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  /** Triggers the file input to open the file dialog */
  triggerFileInput() {
    const fileInput = document.getElementById('profileImage') as HTMLInputElement;
    fileInput.click();
  }

  /** Async validator to check if the email is already taken */
  emailNotTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const email = control.value;
      return this.empService.isEmailTaken(email).pipe(
        map(isTaken => (isTaken ? { emailTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  /** Custom validator to check if password and confirm password match */
  passwordMatchValidator: ValidatorFn = (form: AbstractControl) => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  /** Toggles the visibility of the password field */
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  /** Toggles the visibility of the confirm password field */
  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /** Validator to check if the date of birth is valid */
  validateDOB(control: any) {
    const value = control.value;
    if (!value) return null;

    const dob = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const isFutureDate = dob > today;
    const isUnderAge = age < 10;

    if (isFutureDate) {
      return { futureDate: true };
    }

    if (isUnderAge) {
      return { underAge: true };
    }

    return null;
  }

  /** Converts a string to camel case */
  camelCase(value: string): string {
    return value
      .toLowerCase()
      .replace(/(?:^|\s)\w/g, match => match.toUpperCase());
  }

  /** Creates a new employee with the form values */
  createEmployee() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const formValue = { ...this.employeeForm.value };
    formValue.salary = parseInt(formValue.salary.replace(/,/g, ''), 10);

    this.empService.createEmployee(formValue).then(() => {
      this.employeeForm.reset({});
      this.location.back();
    }).catch(error => {
      console.error('Error creating employee:', error);
      alert('There was an error creating the employee.');
    });
  }

}