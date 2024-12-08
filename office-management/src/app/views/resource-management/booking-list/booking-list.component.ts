import { Component, TemplateRef } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';
import { BookingService } from '../../../services/resource-services/booking.service';
import { Booking } from '../../../models/resource/booking.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ResourceService } from '../../../services/resource-services/resource.service';
import { Resource } from '../../../models/resource/resource.model';
import { EmployeeService } from '../../../services/employee-service/employee.service';
import { Employee } from '../../../models/employee/employee.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'booking-list',
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // Ensure HttpClientModule is imported here
    PaginationComponent,
    ReactiveFormsModule
  ]
})
export class BookingListComponent {

  bookings: any[] = [];
  resources: Resource[] = [];
  employees: Employee[] = [];
  booking!: any;
  selectedBookingId!: number;

  paginatedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15];
  searchQuery: string = '';
  showBookingsList: any;
  bookingShow: boolean = false;

  constructor(private modalService: NgbModal, private bookingService: BookingService,
    private resourceService: ResourceService, private employeeService: EmployeeService, private router: Router) {
  }



  ngOnInit(): void {
    this.loadBookingAndResources();
  }
  loadBookingAndResources() {

    Promise.all([
      this.resourceService.getResources(),
      this.employeeService.getEmployees() // Assuming you have a method to fetch employees
    ]).then(
      ([resources, employees]) => {
        this.resources = resources;
        console.log(this.resources)
        this.employees = employees;
        this.loadBookings();
      },
      (error) => {
        console.error("Error in Fetching Resources and Employees", error);
      }
    );


  }

  loadBookings() {


    this.bookingService.getBookings().then(
      (data: Booking[]) => {
        console.log(data)
        console.log(this.resources)
        this.bookings = data.map(booking => {

          const resource = this.resources.find(r => r.id === booking.resourceId);
          console.log('Booking Resource ID:', booking.resourceId);
          console.log('Found Resource:', resource);
          const employee = this.employees.find(e => e.id as any == booking.empId);
         
          console.log('Booking employee ID:', booking.empId);
          console.log('Found employee:', this.employees);
          return {
            ...booking,
            resourceName: resource ? resource.resourceName : 'Unknown',
            name: employee ? employee.name : 'Unknown'
          };
        });
        console.log(this.bookings);
        this.updatePaginatedItems();
      },
      (error) => {
        console.log("Error in Fetching Bookings", error);
      }
    );

  }

  updatePaginatedItems() {
    const filteredBookings = this.searchQuery
      ? this.bookings.filter(item =>
        Object.values(item).some(val =>
          val !== null && val !== undefined && val.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
      : this.bookings;

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedItems = filteredBookings.slice(start, end);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  onItemsPerPageChanged(event: Event) {
    const newItemsPerPage = Number((event.target as HTMLSelectElement).value);
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1;
    this.updatePaginatedItems();
  }

  onSearchQueryChanged(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.updatePaginatedItems();
  }



  routeToBookingsList(showBookingsList: boolean) {
    this.showBookingsList = !showBookingsList;
    this.booking = this.booking
  }

  createBookings() {
    this.router.navigate(['home/resource/booking/create-booking']);
  }
  updateBooking(bookingId: number) {
    this.router.navigate(['home/resource/booking/update-booking', bookingId]);
  }

 

  openDeleteModal(content: TemplateRef<any>, id: number) {
    this.selectedBookingId = id;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
        },
        (reason) => {
          console.log(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === 'Cross click') {
      return 'by clicking on a cross';
    } else if (reason === 'cancel click') {
      return 'by clicking on cancel';
    } else {
      return `with: ${reason}`;
    }
  }

  confirmDelete() {
    this.bookingService.deleteBooking(this.selectedBookingId).then(
      () => {
        this.loadBookings();
      },
      (error) => console.error('Error deleting Booking', error)
    );
  }

 

  routeToDetails(booking: any) {
    this.booking = booking;
    this.bookingShow = true;
  }

  backToBookings(bookShow: boolean) {
    this.bookingShow = bookShow;
  }

  //time format
  formatTime(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${amPm}`;
  }
}
