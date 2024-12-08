//<!-- myo thu aung -->
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CrudMeetingService,
  Meeting,
} from '../../../services/meeting-services/crud-meeting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../services/meeting-services/meeting-modal';
import { EmployeeService } from '../../../services/employee-service/employee.service';

@Component({
  selector: 'app-update-meeting',
  templateUrl: './update-meeting.component.html',
  styleUrls: ['./update-meeting.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class UpdateMeetingComponent implements OnInit {
  meetingForm!: FormGroup;
  meetingId!: string;
  isUpdate: boolean = true;
  isModalOpen: boolean = false;
  showParticipants = false;
  selectedDays: Set<string> = new Set();
  employees: Employee[] = [];
  canChooseEmployees: any[] = [];
  newEmployee!: FormGroup;
  filteredEmployee: any[] = [...this.employees];
  searchName: string = '';

  meeting: Meeting = {
    meetingName: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    seat: 0,
    room: '',
    participants: '',
    repeatOn: [],
    employees: [],
  };

  constructor(
    private fb: FormBuilder,
    private meetingService: CrudMeetingService,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.route.paramMap.subscribe((params) => {
      this.isUpdate = params.get('mode') === 'update';
      this.meetingId = params.get('id')!;
      this.initializeForm();
      this.loadMeetingData();
    });
  }

  // To get the FormArray for all employees added to the meeting
  get allEmployees(): FormArray {
    return this.meetingForm.get('employees') as FormArray;
  }

  // To get the FormArray for all employees that can be chosen for the meeting
  get showChooseEmployees(): FormArray {
    return this.meetingForm.get('canChooseEmployees') as FormArray;
  }

  // Load all employees from the EmployeeService
  loadEmployees() {
    this.employeeService
      .getEmployees()
      .then((employee) => {
        this.canChooseEmployees = employee;
        console.log('availableEmployees: ', this.employees);
      })
      .catch((error) => {
        console.error('Error loading employees', error);
      });
  }

  // Filter employees based on the search input
  searchEmployee() {
    this.filteredEmployee = this.employees.filter((employee) =>
      employee.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }

  // Remove an employee from the selected employees list
  removeEmployee(index: number) {
    this.allEmployees.removeAt(index);
  }

  // Add a new employee to the selected employees list
  addEmployee() {
    if (this.newEmployee.valid) {
      this.allEmployees.push(this.fb.group(this.newEmployee.value));
      this.employees.push(this.newEmployee.value);
      console.log('employees: ', this.employees);
      this.closeAddEmployeeModal();
    }
  }

  // Open the modal for adding a new employee
  openAddEmployeeModal() {
    console.log('openAddEmployeeModal is called');
    this.newEmployee.reset();
    this.isModalOpen = true;
  }

  // Close the modal for adding a new employee
  closeAddEmployeeModal() {
    console.log('closeAddEmployeeModal is called');
    this.isModalOpen = false;
  }

  // Initialize the form for meeting details
  initializeForm(): void {
    this.meetingForm = this.fb.group({
      meetingName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      seat: [0, Validators.required],
      room: ['', Validators.required],
      employees: this.fb.array([]),
    });
    this.newEmployee = this.fb.group({
      name: ['', Validators.required],
    });
  }

  // Load meeting data from the meeting service and populate the form
  loadMeetingData(): void {
    console.log('LoadMeetingData is called');
    this.meetingService.getMeetingById(this.meetingId).then((meeting) => {
      // this.meeting = meeting;
      // this.meetingForm.patchValue(meeting)
      this.meetingForm.patchValue(meeting);
      this.selectedDays = new Set(meeting.repeatOn);
      document.querySelectorAll('.day-toggle button').forEach((button) => {
        if (this.selectedDays.has(button.textContent!.trim())) {
          button.classList.add('active');
        }
      });

      meeting.employees.forEach((employee: Employee) => {
        this.allEmployees.push(this.fb.group({ name: employee.name }));
      });

      this.employeeService.getEmployees().then((employees) => {
        this.canChooseEmployees = employees;
        console.log(
          'loadMeetingData canChooseEmployee' + this.canChooseEmployees
        );
      });
    });
  }

  //updating meeting
  updateMeeting(): void {
    if (this.meetingForm.valid) {
      const meetingData = this.meetingForm.value;
      meetingData.repeatOn = Array.from(this.selectedDays);
      this.meetingService
        .updateMeeting(this.meetingId, meetingData)
        .then(() => {
          this.router.navigate(['/home/meeting']);
        });
    }
  }

  //for toggle  days
  toggleDay(event: any, day: string) {
    event.target.classList.toggle('active');
    if (this.selectedDays.has(day)) {
      this.selectedDays.delete(day);
    } else {
      this.selectedDays.add(day);
    }
  }

  //for select all day
  selectAllDays() {
    this.selectedDays = new Set([
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ]);
    document.querySelectorAll('.day-toggle button').forEach((button) => {
      button.classList.add('active');
    });
  }

  // Navigate back to the list of meetings
  goToList(): void {
    this.router.navigate(['/home/meeting']);
  }

  // Validate that the end date is not before the start date
  endDateBeforeStartDate(): boolean {
    const startDate = this.meetingForm.get('startDate')?.value;
    const endDate = this.meetingForm.get('endDate')?.value;
    return new Date(endDate) < new Date(startDate);
  }
  // Validate that the end time is not before the start time
  endTimeBeforeStartTime(): boolean {
    const startDate = this.meetingForm.get('startDate')?.value;
    const endDate = this.meetingForm.get('endDate')?.value;
    const startTime = this.meetingForm.get('startTime')?.value;
    const endTime = this.meetingForm.get('endTime')?.value;
    if (startDate === endDate) {
      return endTime <= startTime;
    }
    return false;
  }
}
