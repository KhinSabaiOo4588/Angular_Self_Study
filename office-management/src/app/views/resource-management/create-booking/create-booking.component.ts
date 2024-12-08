import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../services/resource-services/booking.service';
import { Resource } from '../../../models/resource/resource.model';
import { ResourceService } from '../../../services/resource-services/resource.service';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../../../services/employee-service/employee.service';
import { Employee } from '../../../models/employee/employee.model';


@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrl: './create-booking.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateBookingComponent {

  bookingForm!: FormGroup;
  resources!: Resource[];
  employees!: Employee[];



  constructor(private location: Location, private http: HttpClient, private fb: FormBuilder,
    private bookingService: BookingService,
    private resourceService: ResourceService, private employeeService: EmployeeService) {
    this.bookingForm = this.fb.group({
      resourceId: ['', Validators.required],
      empId: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    })
  }
  ngOnInit(): void {

    this.loadEmployee();
    this.loadResource();
  }

  loadResource() {
    this.resourceService.getResources().then(
      (data: Resource[]) => {
        this.resources = data;
        console.log(this.resources);
      },
      (error) => {
        console.log("Error in Fetching Resources", error);
      }
    );
  }

  loadEmployee() {
    this.http.get<any[]>('http://localhost:3000/employees').subscribe(data => {
      this.employees = data;
    });
  }
  onSubmit() {
    if (this.bookingForm.valid) {
      this.bookingService.createBooking(this.bookingForm.value).then(
        () => {
          this.location.back();
          // this.router.navigate(['/resource']);
        },
        (error) => console.error('Error adding Resource', error)
      );
    }
  }

  goBack() {
    this.location.back();
  }

}
