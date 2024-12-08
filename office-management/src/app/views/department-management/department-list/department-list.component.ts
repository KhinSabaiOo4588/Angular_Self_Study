/* <!-- By Thin Thin Oo 26/6/2024, For  list Department Component  --> */
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from "../../pagination/pagination.component";
import { Department } from '../../../models/department/department.model';
import { DepartmentEmployeeComponent } from '../department-employee/department-employee.component';
import { DepartmentService } from '../../../services/department-services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, PaginationComponent, DepartmentEmployeeComponent]
})
export class DepartmentListComponent implements OnInit {

  departments: Department[] = [];
  paginatedDepartments: Department[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15];
  searchQuery: string = '';
  viewStatus: string = 'dep-list';
  selectedDepartment: Department | null = null;

  constructor(private router: Router, private departmentService: DepartmentService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    this.departmentService.getDepartments()
      .then(data => {
        this.departments = data.map(department => ({
          ...department,
          id: department.id ? String(department.id) : undefined
        }));
        this.updatePaginatedItems();
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  }

  updatePaginatedItems() {
    const filteredDepartments = this.searchQuery
      ? this.departments.filter(department =>
        Object.values(department).some(val =>
          val !== null && val !== undefined && val.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
      : this.departments;

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedDepartments = filteredDepartments.slice(start, end);
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

  addDepartment() {
    this.router.navigate(['/home/department/department-add']);
  }

  viewDepartment(department: Department, readonly: boolean) {
    const mode = readonly ? 'view' : 'edit';
    this.router.navigate(['/home/department/department-view', department.id, mode]);
  }

  editDepartment(department: Department) {
    this.viewDepartment(department, false);
  }

  openDeleteModal(content: TemplateRef<any>, department: Department) {
    this.selectedDepartment = department;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  confirmDelete() {
    if (this.selectedDepartment) {
      this.departmentService.deleteDepartment(this.selectedDepartment.id!)
        .then(() => {
          this.departments = this.departments.filter(department => department.id !== this.selectedDepartment!.id);
          this.updatePaginatedItems();
          this.modalService.dismissAll();
        })
        .catch(error => {
          console.error('Error deleting department:', error);
        });
    }
  }

  viewDepartmentList(status: string) {
    this.viewStatus = status;
  }
}
