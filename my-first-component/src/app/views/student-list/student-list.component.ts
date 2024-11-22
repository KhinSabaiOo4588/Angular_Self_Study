import { Component } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import {  StudentService } from 'src/app/services/student.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  students: Student[] = [];

  constructor(private services: StudentService) {
    this.students = this.services.getAll();
  }

  deleteStudent(id: number) {
    this.services.delete(id);
    this.students = this.services.getAll();
  }
}
