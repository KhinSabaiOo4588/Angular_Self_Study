// By Thin Thin Oo 26/6/2024, For Attendance   -->
import { Component } from '@angular/core';
import { AttendanceService } from '../../../services/attendance-service/attendance.service';
import { CommonModule } from '@angular/common';
import { AttendanceRecordComponent } from './attendance-record/attendance-record.component';
// import { AttendanceRecordComponent } from "../attendance-record/attendance-record.component";

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  standalone: true,
  imports: [CommonModule, AttendanceRecordComponent]
})
export class AttendanceComponent {
  userName = localStorage.getItem('userName');
  role = 'jobPositon'; // You can fetch the role from user data or other sources
  isCheckedIn = false;
  isCheckedOut = false;
  showCheckInGreeting = false;
  showCheckOutButton = false;
  showCheckOutGreeting = false;
  checkInTime: Date | null = null;
  checkOutInfo: any = null;

  viewStatus: string = 'att-view';
  constructor(private attendanceService: AttendanceService) { }

  // Handles user check-in
  onCheckIn() {
    this.checkInTime = this.attendanceService.checkIn(this.userName ?? 'defaultUserName', this.role);

    console.log()
    this.isCheckedIn = true;
    this.showCheckInGreeting = true;
    console.log('User checked in:', this.checkInTime);
    setTimeout(() => {
      this.showCheckInGreeting = false;
      this.showCheckOutButton = true;
      console.log('Check-in greeting hidden, check-out button shown');
    }, 3000);
  }

  // Handles the OK button click after check-in greeting
  onCheckInGreeting() {
    this.showCheckOutButton = true;
    this.showCheckInGreeting = false;
    console.log('Check-in greeting dismissed, check-out button shown');
  }

  // Handles user check-out
  onCheckOut() {
    this.attendanceService.checkOut(this.userName ?? 'defaultUserName').then(checkOutInfo => {
      this.checkOutInfo = checkOutInfo;
      this.isCheckedOut = true;
      this.showCheckOutButton = false;
      this.showCheckOutGreeting = true;
      console.log('User checked out:', this.checkOutInfo);
      setTimeout(() => {
        this.reset();
        console.log('Reset after check-out');
      }, 4000);
    });
  }

  // Handles the Goodbye button click after check-out greeting
  onCheckOutGreeting() {
    this.isCheckedIn = false;
    this.isCheckedOut = false;
    this.showCheckInGreeting = false;
    this.showCheckOutButton = false;
    this.showCheckOutGreeting = false;
    console.log('Check-out greeting dismissed, reset to initial state');
  }

  // Resets the component state
  reset() {
    this.isCheckedIn = false;
    this.isCheckedOut = false;
    this.showCheckInGreeting = false;
    this.showCheckOutButton = false;
    this.showCheckOutGreeting = false;
    this.checkInTime = null;
    this.checkOutInfo = null;
    console.log('Component state reset');
  }

  viewAttendance(status: string) {
    this.viewStatus = status;
  }
}
