/** Author By @Khin Sabai Oo */
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../services/employee-service/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PaginationComponent,
    RouterModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  paginatedEmployees: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15];
  searchQuery: string = '';

  constructor(private router: Router, private empService: EmployeeService) { }

  /** Lifecycle hook that is called after data-bound properties are initialized */
  ngOnInit(): void {
    this.empService.getEmployees().then(data => {
      this.employees = data;
      this.updatePaginatedItems();
    }).catch(error => {
      console.error('Error fetching employees:', error);
      this.employees = [];
    });
  }

  /** Updates the list of employees to be displayed based on the current page, items per page, and search query */
  updatePaginatedItems() {
    const filteredEmployees = this.searchQuery
      ? this.employees.filter(employee =>
        Object.values(employee).some(val =>
          val !== null && val !== undefined && val.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
      : this.employees;

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedEmployees = filteredEmployees.slice(start, end);
  }

  /** Handles page change event */
  onPageChanged(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  /** Handles change in items per page */
  onItemsPerPageChanged(event: Event) {
    const newItemsPerPage = Number((event.target as HTMLSelectElement).value);
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1;
    this.updatePaginatedItems();
  }

  /** Handles change in search query */
  onSearchQueryChanged(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.updatePaginatedItems();
  }

  /** Navigates to the employee creation page */
  addEmployee() {
    this.router.navigate(['home/employee/create']);
  }

  /** Navigates to the employee view page */
  viewEmployee(id: number) {
    this.router.navigate(['home/employee/view', id]);
  }

  /** Navigates to the employee edit page */
  editEmployee(id: number) {
    this.router.navigate(['home/employee/edit', id]);
  }

  /** Deletes an employee after confirmation */
  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empService.deleteEmployee(id).then(() => {
        this.employees = this.employees.filter(employee => employee.id !== id);
        this.updatePaginatedItems();
      }).catch(error => {
        console.error('Error deleting employee:', error);
      });
    }
  }
}