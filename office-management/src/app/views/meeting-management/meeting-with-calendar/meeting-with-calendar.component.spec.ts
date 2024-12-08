//<!-- myo thu aung -->
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingWithCalendarComponent } from './meeting-with-calendar.component';

describe('MeetingWithCalendarComponent', () => {
  let component: MeetingWithCalendarComponent;
  let fixture: ComponentFixture<MeetingWithCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingWithCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingWithCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
