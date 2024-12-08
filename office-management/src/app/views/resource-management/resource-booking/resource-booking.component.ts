import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import { CommonModule } from '@angular/common';
import { BookingListComponent } from '../booking-list/booking-list.component';

@Component({
  selector: 'app-resource-booking',
  templateUrl: './resource-booking.component.html',
  styleUrl: './resource-booking.component.css',
  standalone: true,
  imports: [
    ResourceListComponent,
    CommonModule,
    BookingListComponent
  ]
})
export class ResourceBookingComponent {


  viewStatus: string = 'book';

  todayMeetings: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  viewCalendar(type: string) {
    this.viewStatus = type;
  }




}


