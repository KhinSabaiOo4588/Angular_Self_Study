/* <!-- Thin Thin Oo --> */
export interface AttendanceRecord {
    username: string;
    role: string | null;
    date: string;
    checkInTime: Date | null;
    checkOutTime: Date | null;
    calculateAttendances: string | null;
  }
  