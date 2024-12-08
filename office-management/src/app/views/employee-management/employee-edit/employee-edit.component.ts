// Author by @Khin Sabai Oo
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../../../services/employee-service/employee.service';
import { CamelCasePipe } from '../../../pipe/camel-case.pipe';
import { CommaFormatDirective } from '../../../pipe/comma-format.directive';
import { emailValidator } from '../employee/email-validator';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CamelCasePipe, CommaFormatDirective],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: string | undefined;
  imageUrl: string | ArrayBuffer | null = 'https://via.placeholder.com/150';
  departments: any[] = [];
  educationLevels: string[] = ["Bachelor's", "Master's", "PhD"];
  roles: string[] = ["Admin", "Manager", "Employee"];
  showPassword = false;
  showConfirmPassword = false;
  statuses: string[] = ["Active", "Inactive", "On Leave", "Terminated", "Retired", "Probation", "Contract", "Resigned", "Training", "Suspended"];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9\s]*$/)]],
      jobPosition: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email], []],
      workPhone: ['', [Validators.required, Validators.pattern('^(09|\\+959)\\d{7,9}$')]],
      workMobile: ['', [Validators.required, Validators.pattern('^(09|\\+959)\\d{7,9}$')]],
      dob: ['', [Validators.required, this.futureDateValidator, this.minAgeValidator(10)]],
      gender: [''],
      address: ['', Validators.required],
      education: [''], // This will now be a select box
      departmentId: ['', Validators.required],
      salary: [0, Validators.min(0)],
      status: ['Active', Validators.required],
      profileImage: [null],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{6,}$')
      ]],
      confirmPassword: ['', [Validators.required,]],
      role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  /** Lifecycle hook that is called after data-bound properties are initialized */
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.getEmployeeData().then(() => {
      this.employeeForm.get('email')?.setAsyncValidators(emailValidator(this.empService, this.employeeId));
    });

    this.empService.getDepartments().then((data: any) => {
      this.departments = data;
    });
  }

  /** Fetches the employee data based on the employee ID */
  async getEmployeeData(): Promise<void> {
    try {
      const data = await this.empService.getEmployee(this.employeeId!);
      this.employeeForm.patchValue(data);
      if (data.profileImage) {
        this.imageUrl = data.profileImage;
      }
      // Ensure the education field is set correctly
      if (data.education) {
        this.employeeForm.get('education')?.setValue(data.education);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
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

  /** Updates the employee data with the form values */
  updateEmployee(event: Event): void {
    event.preventDefault();
    if (this.employeeForm.valid) {
      const formValue = { ...this.employeeForm.value };
      formValue.salary = parseInt(formValue.salary.toString().replace(/,/g, ''), 10);

      this.empService.updateEmployee(this.employeeId!, formValue).then(() => {
        alert('Employee Update successful.');
        this.location.back();
      }).catch(error => {
        console.error('Error updating employee:', error);
        alert('There was an error updating the employee.');
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
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

  /** Converts a string to camel case */
  camelCase(value: string): string {
    return value
      .toLowerCase()
      .replace(/(?:^|\s)\w/g, match => match.toUpperCase());
  }

  /** Validator to check if the date is in the future */
  futureDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const currentDate = new Date();
    if (new Date(control.value) > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  /** Validator to check if the age is above a minimum age */
  minAgeValidator(minAge: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const birthDate = new Date(control.value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      if (age < minAge) {
        return { underAge: true };
      }
      return null;
    };
  }

  /** Navigates back to the previous location */
  back() {
    this.location.back();
  }
}