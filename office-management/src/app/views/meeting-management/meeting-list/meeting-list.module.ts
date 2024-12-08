//<!-- myo thu aung -->
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MeetingWithCalendarComponent } from '../meeting-with-calendar/meeting-with-calendar.component';
import { UpdateMeetingComponent } from '../update-meeting/update-meeting.component';
import { CreateMeetingComponent } from '../create-meeting/create-meeting.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MeetingWithCalendarComponent },
      {
        path: 'update-meeting/:id/:mode',
        component: UpdateMeetingComponent,
        
      },
      { path: 'create-meeting', component: CreateMeetingComponent },
      {
        path: 'meeting-with-calendar',
        component: MeetingWithCalendarComponent,
      },
    ]),
  ],
})
export class MeetingListModule {}
