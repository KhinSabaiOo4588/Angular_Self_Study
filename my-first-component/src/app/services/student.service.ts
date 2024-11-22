import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

const STORAGE = 'studentList';

@Injectable({
  providedIn: 'root',
})

export class StudentService {

  private list: Student[] = [];

  constructor() {
    const storedData = localStorage.getItem(STORAGE);
    this.list = storedData ? JSON.parse(storedData) : [];
  }

  getAll(): Student[] {
    return this.list;
  }

  findById(id: number): Student | undefined {
    return this.list.find((s) => s.id === id);
  }

  save(student: Student): void {
    student.id = new Date().getTime();
    this.list.push(student);
    localStorage.setItem(STORAGE, JSON.stringify(this.list));
  }

  update(student: Student): void {
    const index = this.list.findIndex((s) => s.id === student.id);
    if (index !== -1) {
      this.list[index] = student;
      localStorage.setItem(STORAGE, JSON.stringify(this.list));
    }
  }

  delete(id: number): void {
    this.list = this.list.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE, JSON.stringify(this.list));
  }
}
