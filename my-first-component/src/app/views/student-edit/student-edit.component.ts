import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})

export class StudentEditComponent implements OnDestroy {
  studentForm: FormGroup;
  private routeSubscription: Subscription;
  isEditMode = false; 

  constructor(
    private services: StudentService,
    private builder: FormBuilder,
    public router: Router, 
    private activatedRoute: ActivatedRoute
  ) {
    // Initialize the form
    this.studentForm = this.builder.group({
      id: [null], 
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{11}$/), 
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(120)]],
    });

    // Determine add or edit mode based on route parameters
    this.routeSubscription = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        const student = this.services.findById(+params['id']);
        if (student) {
          this.studentForm.patchValue(student); 
        }
      } else {
        this.isEditMode = false;
      }
    });
  }

  save() {
    if (this.studentForm.valid) {
      if (this.isEditMode) {
        this.services.update(this.studentForm.value);
      } else {
        this.services.save(this.studentForm.value);
      }
      this.router.navigateByUrl('/list');
    } else {
      console.error('Form is invalid');
    }
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // Helper to check control validity in the template
  isControlInvalid(controlName: string): boolean {
    const control = this.studentForm.get(controlName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }
  
}
