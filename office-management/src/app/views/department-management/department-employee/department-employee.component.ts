/* <!-- By Thin Thin Oo 26/6/2024, For  View of Employee and Department Component  --> */
import { Component, OnInit } from '@angular/core';
// import { DepartmentService } from '../../../services/depertment-service/department.service';
import { Department } from '../../../models/department/department.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../pagination/pagination.component';
import { Router } from '@angular/router';
import { DepartmentService } from '../../../services/department-services/department.service';

@Component({
  selector: 'app-department-employee',
  templateUrl: './department-employee.component.html',
  styleUrls: ['./department-employee.component.css'],
  standalone: true,
  imports: [PaginationComponent, CommonModule]
})
export class DepartmentEmployeeComponent implements OnInit {
  departments: Department[] = [];
  paginatedDepartments: Department[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15];
  searchQuery: string = '';

  constructor(private departmentService: DepartmentService, private router: Router) { }

  ngOnInit(): void {
    this.fetchDepartmentsWithEmployees();
  }

  fetchDepartmentsWithEmployees(): void {
    this.departmentService.getDepartmentsWithEmployees()
      .then(departments => {
        this.departments = departments || [];
        this.updateFilteredDepartments();
      })
      .catch(error => {
        console.error('Error fetching departments with employees:', error);
      });
  }

  updateFilteredDepartments() {
    // Filter departments based on search query
    this.paginatedDepartments = this.departments.filter(department =>
      department.employees!.some(employee =>
        employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );

    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedDepartments = this.paginatedDepartments.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.updateFilteredDepartments();
  }

  onItemsPerPageChanged(event: Event) {
    const newItemsPerPage = Number((event.target as HTMLSelectElement).value);
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1;
    this.updateFilteredDepartments();
  }

  onSearchQueryChanged(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage = 1; // Reset to first page when searching
    this.updateFilteredDepartments();
  }
  addDepartment() {
    this.router.navigate(['/home/department/department-add']);
  }
}

