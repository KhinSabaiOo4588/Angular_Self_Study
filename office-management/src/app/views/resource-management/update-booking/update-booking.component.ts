// HanNaungSoe update booking 
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Booking } from '../../../models/resource/booking.model';
import { BookingService } from '../../../services/resource-services/booking.service';
import { CommonModule, Location } from '@angular/common'
import { ResourceService } from '../../../services/resource-services/resource.service';
import { Resource } from '../../../models/resource/resource.model';
import { HttpClient } from '@angular/common/http';

const LocationsList = [
  { id: 0, name: '1203' },
  { id: 1, name: '1202' },
  { id: 2, name: '1202 First Floor' },
  { id: 3, name: '1202 Second Floor' },
  { id: 4, name: '1203 First Floor' },
  { id: 5, name: '1203 Second Floor' }

];

const ResourceType = [
  { id: 0, name: 'Office Furniture' },
  { id: 1, name: 'Room' },
  { id: 2, name: 'Printing and Scanning Equipment' },
  { id: 3, name: 'Office Supplies' },
  { id: 4, name: 'Storage Solutions' },
  { id: 5, name: 'Cleaning and Maintenance Supplies' },
  { id: 6, name: 'Miscellaneous Equipment' },
  { id: 7, name: 'Breakroom Supplies' },
  { id: 8, name: 'Communication Equipment' }
]

const StatusList = [
  { id: 0, name: 'Avaliable' },
  { id: 1, name: 'Not Avaliable' }

];
@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrl: './update-booking.component.css',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule

  ]
})
export class UpdateBookingComponent {

  bookingForm!: FormGroup;
  booking!: Booking;
  resources: Resource[] = [];
  employees: any[] = [];
  bookingId!: number;

  // assigning value
  statusList = StatusList// Status Array
  locationsList = LocationsList;
  types = ResourceType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private resourceService: ResourceService,
    private fb: FormBuilder,
    private location: Location,
    private http: HttpClient
  ) {
    this.bookingForm = this.fb.group({
      resourceId: ['', Validators.required],
      empId: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],

    });

  }

  ngOnInit(): void {

    // take out id param value
    this.route.params.subscribe((params) => {
      this.bookingId = params['id'];
      // getting all booking data
      this.loadBooking();
      // getting all Resouce Date
      this.loadResource();
      // getting all employee Data
      this.loadEmployee();
    });
  }
  loadBooking() {
    this.bookingService.getBookingById(this.bookingId).then((data) => {

      this.bookingForm.patchValue(data)
      console.log("Booking get Successful", data)
    })
      .catch((error) => {
        console.error('Error loading Booking:', error);
      });
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



  // store form data value
  onSubmit() {
    if (this.bookingForm.valid) {
      const formData = this.bookingForm.value;

      this.bookingService.updateBooking(this.bookingId, formData).then(
        () => {
          console.log('Update Successful!');
        },
        (error) => {
          console.error("Error in Updating Booking", error);
        }
      );
      this.location.back();
    } else {
      alert('Update Error')
      this.router.navigate(['resource/booking/update-booking', this.bookingId]);
    }

  }

  goBack() {
    this.location.back();
  }
}
