// // By Thin Thin Oo 26/6/2024, For Attendance Service 

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AttendanceRecord } from '../../models/attendance/attendance-record.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private checkInTime: Date | null = null;
  private checkOutTime: Date | null = null;
  private role: string | null = null;

  constructor(private http: HttpClient) { }
  // Method to handle check-in
  checkIn(username: string, role: string): Date {
    this.checkInTime = new Date();
    this.role = role;
    console.log(`Checked in at: ${this.checkInTime}`);
    return this.checkInTime;
  }
  // Method to handle check-out and save attendance data
  async checkOut(username: string): Promise<AttendanceRecord> {
    this.checkOutTime = new Date();
    const attendanceRecord: AttendanceRecord = {
      username: username,
      role: this.role,
      date: new Date().toLocaleDateString(),
      checkInTime: this.checkInTime,
      checkOutTime: this.checkOutTime,
      calculateAttendances: this.getcalculateAttendances()
    };

    console.log(`Checked out at: ${this.checkOutTime}`);
    console.log(`Work calculateAttendances: ${attendanceRecord.calculateAttendances}`);

    return firstValueFrom(this.http.post<AttendanceRecord>('http://localhost:3000/attendance', attendanceRecord));
  }
  // Method to get all attendance data
  async getAttendanceData(): Promise<AttendanceRecord[]> {
    return firstValueFrom(this.http.get<AttendanceRecord[]>('http://localhost:3000/attendance'));
  }
  // Private method to calculate the calculateAttendances between check-in and check-out
  private getcalculateAttendances(): string | null {
    if (this.checkInTime && this.checkOutTime) {
      const diff = this.checkOutTime.getTime() - this.checkInTime.getTime();
      return this.formatcalculateAttendances(diff);
    }
    return null;
  }
  // Private method to format the calculateAttendances into a readable string
  private formatcalculateAttendances(milliseconds: number): string {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const formattedcalculateAttendances = `${hours} hours, ${minutes} minutes`;
    console.log(`Formatted calculateAttendances: ${formattedcalculateAttendances}`);
    return formattedcalculateAttendances;
  }
}