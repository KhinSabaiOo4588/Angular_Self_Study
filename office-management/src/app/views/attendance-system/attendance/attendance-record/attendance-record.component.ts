// // By Thin Thin Oo 26/6/2024, For Attendance   -->
import { Component, OnInit } from '@angular/core';
// import { AttendanceService } from '../../../services/attendance-service/attendance.service';
// import { AttendanceRecord } from '../../../models/attendance/attendance-record.model';
// import { PaginationComponent } from '../../pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { AttendanceRecord } from '../../../../models/attendance/attendance-record.model';
import { AttendanceService } from '../../../../services/attendance-service/attendance.service';

@Component({
    selector: 'app-attendance-record',
    templateUrl: './attendance-record.component.html',
    styleUrls: ['./attendance-record.component.css'],    
    standalone: true,
    imports: [CommonModule, PaginationComponent]
})
export class AttendanceRecordComponent implements OnInit {
    attendanceList: AttendanceRecord[] = [];
    paginatedAttendanceList: AttendanceRecord[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 5;
    itemsPerPageOptions: number[] = [5, 10, 15];

    constructor(private attendanceService: AttendanceService) { }

    async ngOnInit() {
        await this.fetchAttendanceData();
    }

    async fetchAttendanceData() {
        this.attendanceList = await this.attendanceService.getAttendanceData();
        this.updatePaginatedItems();
    }

    updatePaginatedItems() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.paginatedAttendanceList = this.attendanceList.slice(start, end);
    }

    async onPageChanged(page: number) {
        this.currentPage = page;
        this.updatePaginatedItems();
    }

    async checkIn(username: string, role: string) {
        await this.attendanceService.checkIn(username, role);
        await this.fetchAttendanceData(); // Refresh data after check-in
    }

    async checkOut(username: string) {
        await this.attendanceService.checkOut(username);
        await this.fetchAttendanceData(); // Refresh data after check-out
    }
}
