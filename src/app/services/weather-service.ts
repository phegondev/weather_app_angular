import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  pressure: number;
}



@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private apiKey = environment.weatherApiKey;
  private apiUrl = environment.weatherApiUrl;

  constructor(private http: HttpClient) { }


  getWeather(city: string): Observable<any> {

    console.log('City is: ', city);

    const url = `${this.apiUrl}/weather?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.http.get(url);
  }


  
  transformWeatherData(data: any): WeatherData {
    console.log("insdie transformWeatherData")
    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      pressure: data.main.pressure
    }
  }


}
