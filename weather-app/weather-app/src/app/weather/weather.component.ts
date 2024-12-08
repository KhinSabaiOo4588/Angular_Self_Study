import { Component } from '@angular/core';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  city?: string;
  weatherData: any;
  latitude?: number;
  longitude?: number;

  constructor(private weatherService: WeatherService) { }

  getWeather() {
    this.weatherData = null;

    if (this.city) {
    
      this.weatherService.getCoordinates(this.city).subscribe(data => {
        if (data && data[0]) {
          const coordinates = data[0]; 
          this.latitude = parseFloat(coordinates.lat);
          this.longitude = parseFloat(coordinates.lon);

          if (this.latitude && this.longitude) {
            this.weatherService.getWeatherByCoordinates(this.latitude, this.longitude).subscribe(weatherData => {
              if (weatherData) {
                console.log('weatherdata',weatherData)
                this.weatherData = weatherData;
              } else {
                alert('No weather data found for ' + this.city);
              }
            }, error => {
              alert('Error fetching weather data');
            });
          } else {
            alert('Invalid coordinates for ' + this.city);
          }
        } else {
          alert('No coordinates found for ' + this.city);
        }
      }, error => {
        alert('Error fetching coordinates');
      });
    } else {
      alert('Please enter a city name');
    }
  }
}
