//myo thu aung
import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  CrudMeetingService,
  Meeting,
} from '../../../services/meeting-services/crud-meeting.service';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'meeting-list',
  imports: [PaginationComponent, RouterLink, CommonModule],
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css'],
  standalone: true,
})
export class MeetingListComponent {
  meetings: any[] = [];
  paginatedMeetings: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15];
  searchQuery: string = '';
  selectedMeeting: any;

  constructor(
    private modalService: NgbModal,
    private meetingService: CrudMeetingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.meetingService.getMeetings().then((data) => {
      this.meetings = data;
      this.updatePaginatedItems();
    });
  }

  viewMeeting(meeting: Meeting, readonly: boolean) {
    const mode = readonly ? 'view' : 'update';
    this.router.navigate(['home/meeting/update-meeting', meeting.id, mode]);
    console.log('View Project is called', meeting);
  }

  updateMeeting(meeting: Meeting) {
    this.viewMeeting(meeting, false);
    this.router.navigate(['home/meeting/update-meeting', meeting.id]);
  }

  updatePaginatedItems() {
    const filteredMeetings = this.searchQuery
      ? this.meetings.filter((meeting) =>
          Object.values(meeting).some(
            (val) =>
              val !== null &&
              val !== undefined &&
              val
                .toString()
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
          )
        )
      : this.meetings;

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedMeetings = filteredMeetings.slice(start, end);
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

  addMeeting() {
    console.log('Add Meeting button clicked');
  }

  openDeleteModal(content: TemplateRef<any>, meeting: any) {
    this.selectedMeeting = meeting;
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
    this.meetingService.deleteMeeting(this.selectedMeeting.id).then(() => {
      this.meetings = this.meetings.filter(
        (m) => m.id !== this.selectedMeeting.id
      );
      this.updatePaginatedItems();
      this.modalService.dismissAll();
    });
  }

  //time format
  formatTime(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${amPm}`;
  }
}
