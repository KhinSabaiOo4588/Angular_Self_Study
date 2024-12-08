//<-- myo thu author -->
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './meeting-modal';

export interface Meeting {
  id?: number;
  meetingName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  seat: number;
  room: string;
  participants: string;
  repeatOn: string[];
  employees: Employee[];
}
@Injectable({
  providedIn: 'root',
})
export class CrudMeetingService {
  private apiUrl = 'http://localhost:3000/meetings';
  constructor(private http: HttpClient) {}

  //get all employees
  getMeetings(): Promise<any> {
    return this.http.get<Meeting[]>(this.apiUrl).toPromise();
  }

 //get one e
  getMeetingById(id: string): Promise<any> {
    return this.http.get<Meeting>(`${this.apiUrl}/${id}`).toPromise();
  }

  createMeeting(meeting: Meeting): Promise<any> {
    return this.http.post<Meeting>(this.apiUrl, meeting).toPromise();
  }

  updateMeeting(id: string, meeting: Meeting): Promise<any> {
    return this.http.put<Meeting>(`${this.apiUrl}/${id}`, meeting).toPromise();
  }

  deleteMeeting(id: string): Promise<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).toPromise();
  }
}
