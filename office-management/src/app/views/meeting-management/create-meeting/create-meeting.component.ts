// <!-- myo thu aung -->
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CrudMeetingService } from '../../../services/meeting-services/crud-meeting.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Employee } from '../../../services/meeting-services/meeting-modal';
import { EmployeeService } from '../../../services/employee-service/employee.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrl: './create-meeting.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  standalone: true,
})
export class CreateMeetingComponent {
  meetingForm: FormGroup;
  selectedDays: Set<string> = new Set();
  isModalOpen: boolean = false;
  searchName: string = '';
  modalRef: NgbModalRef | null = null;
  employees: Employee[] = [];
  canChooseEmployees: any[] = [];
  newEmployee: FormGroup;
  filteredEmployee: any[] = [...this.employees];

  constructor(
    private fb: FormBuilder,
    private meetingService: CrudMeetingService,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.meetingForm = this.fb.group({
      meetingName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      seat: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      room: ['', Validators.required],
      employees: this.fb.array([]),
    });

    this.newEmployee = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  //for select days
  toggleDay(event: any, day: string) {
    event.target.classList.toggle('active');
    if (this.selectedDays.has(day)) {
      this.selectedDays.delete(day);
    } else {
      this.selectedDays.add(day);
    }
  }

  //for select all days
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

  // date check 
  endDateBeforeStartDate(): boolean {
    const startDate = this.meetingForm.get('startDate')?.value;
    const endDate = this.meetingForm.get('endDate')?.value;
    return startDate && endDate && endDate < startDate;
  }

  //time check
  endTimeBeforeStartTime(): boolean {
    const startDate = this.meetingForm.get('startDate')?.value;
    const endDate = this.meetingForm.get('endDate')?.value;
    const startTime = this.meetingForm.get('startTime')?.value;
    const endTime = this.meetingForm.get('endTime')?.value;
    if (startDate && endDate && startTime && endTime) {
      if (startDate === endDate) {
        return startTime >= endTime;
      }
    }
    return false;
  }

  // to get employees for meeting invite
  get allEmployees(): FormArray {
    return this.meetingForm.get('employees') as FormArray;
  }

  get showChooseEmployees(): FormArray {
    return this.meetingForm.get('canChooseEmployees') as FormArray;
  }

  //get all employees
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

  //for create meeting
  createMeeting() {
    if (
      this.meetingForm.valid &&
      !this.endDateBeforeStartDate() &&
      !this.endTimeBeforeStartTime()
    ) {
      const formData = this.meetingForm.value;
      formData.repeatOn = Array.from(this.selectedDays);
      formData.employees = this.employees;
      console.log('Form Data:', formData);

      this.meetingService.createMeeting(formData).then(
        (response) => {
          console.log('Meeting Created:', response);
          this.router.navigate(['home/meeting']);
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  //for search employee
  searchEmployee() {
    this.filteredEmployee = this.employees.filter((employee) =>
      employee.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }

  //for remove employee that is selected
  removeEmployee(index: number) {
    this.allEmployees.removeAt(index);
  }

  addEmployee() {
    if (this.newEmployee.valid) {
      this.allEmployees.push(this.fb.group(this.newEmployee.value));
      this.employees.push(this.newEmployee.value);
      console.log('employees: ', this.employees);
      this.closeAddEmployeeModal();
    }
  }

  //close and open modal
  openAddEmployeeModal() {
    console.log('openAddEmployeeModal is called');
    this.newEmployee.reset();
    this.isModalOpen = true;
  }
  closeAddEmployeeModal() {
    console.log('closeAddEmployeeModal is called');
    this.isModalOpen = false;
  }
}
