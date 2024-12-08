// booking Service CRUD @HanNaungSoe
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../../models/resource/booking.model';

const api = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})

export class BookingService {
 
  private apiUrl = `${ api }/bookings`;

  constructor(private http: HttpClient) { }

  // Getting All Bookings
  getBookings(): Promise<Booking[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Booking[]>(this.apiUrl).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // getting booking By Id
  getBookingById(id: number): Promise<Booking> {
    return new Promise((resolve, reject) => {
      this.http.get<Booking>(`${this.apiUrl}/${id}`).subscribe(
      (data) => resolve(data),
      (error) => reject(error)
    );
  });
  }
  
  // Create Booking
  createBooking(booking: Booking): Promise<Booking>{
    return new Promise((resolve, reject) => {
      this.http.post<Booking>(this.apiUrl, booking).subscribe(
        (data) => resolve(data),
        (error) => reject(error)
      )
    })
  }

  // deleting Booking
  deleteBooking(id: number): Promise<Booking> {
    return new Promise((resolve, reject) => {
      this.http.delete<Booking>(`${this.apiUrl}/${id}`).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      );
    });
  }

// updating Booking
  updateBooking(id: number, resource: Booking): Promise<Booking> {
    return new Promise((resolve, reject) => {
      this.http.put<Booking>(`${this.apiUrl}/${id}`, resource).subscribe(
        (data) => resolve(data),
        (error) => reject(error)
      );
    });
  }


  
}
