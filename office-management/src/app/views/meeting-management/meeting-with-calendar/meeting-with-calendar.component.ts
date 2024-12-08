//<!-- myo thu aung -->
import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from '../meeting-list/meeting-list.component';
import { HttpClient } from '@angular/common/http';
import { format, parseISO } from 'date-fns';
@Component({
  selector: 'app-meeting-with-calendar',
  templateUrl: './meeting-with-calendar.component.html',
  styleUrl: './meeting-with-calendar.component.css',
  standalone: true,
  imports: [FullCalendarModule, RouterLink, CommonModule, MeetingListComponent],
})
export class MeetingWithCalendarComponent {
  private url = 'http://localhost:3000/meetings';
  viewStatus: string = 'calendar';
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventColor: ' #54b9b8',
  };
  todayMeetings: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMeetings();
  }

  viewCalendar(type: string) {
    this.viewStatus = type;
  }

  loadMeetings() {
    this.http.get<any[]>(this.url).subscribe((data) => {
      const events = data.map((meeting) => ({
        title: meeting.meetingName,
        start: meeting.startDate,
        end: meeting.endDate,
      }));
      this.calendarOptions.events = events;
      this.filterTodayMeetings(data);
    });
  }

  filterTodayMeetings(meetings: any[]) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    this.todayMeetings = meetings
      .filter((meeting) => meeting.startDate === today)
      .map((meeting) => {
        return {
          ...meeting,
          formattedStartTime: format(parseISO(meeting.startDate), 'p'), // Format time as 9:58AM
          formattedEndTime: format(parseISO(meeting.endDate), 'p'), // Format time as 10:59AM
        };
      });

    console.log("Today's Date:", today);
    console.log('Meetings:', meetings);
    console.log("Today's Meetings:", this.todayMeetings);
  }
}
