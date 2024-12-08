
// @HanNaungSoe booking interface
export interface Booking {
    bookingId?: number;
    resourceId: number;
    empId: number;
    date: string;
    startTime: string;
    endTime: string;
}