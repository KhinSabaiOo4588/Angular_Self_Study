import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCoordinates(city: string): Observable<any> {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?city=${city}&format=json`;
    return this.http.get<any>(geocodeUrl);
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    return this.http.get<any>(weatherUrl);
  }
}
