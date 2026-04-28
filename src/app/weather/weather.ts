import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherData, WeatherService } from '../services/weather-service';

@Component({
  selector: 'app-weather',
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {

  searchQuery = signal('');
  weatherData = signal<WeatherData | null>(null);
  loading = signal(false);
  error = signal('');
  recentSearches = signal<string[]>([]);

  constructor(private weatherService: WeatherService) { }


  // Popular locations (cities and countries)
  popularLocations = [
    { name: 'London', type: 'city' },
    { name: 'New York', type: 'city' },
    { name: 'Tokyo', type: 'city' },
    { name: 'Paris', type: 'city' },
    { name: 'United Kingdom', type: 'country' },
    { name: 'Japan', type: 'country' },
    { name: 'Australia', type: 'country' },
    { name: 'Canada', type: 'country' }
  ];

  ngOnInit() {

    const saved = localStorage.getItem('recentSearches');

    if (saved) {
      this.recentSearches.set(JSON.parse(saved));
    }
  }


  searchWeather() {
    if (!this.searchQuery().trim()) {
      this.error.set('Please enter a city or country name');

      setTimeout(() => {
        this.error.set('');
      }, 8000);

      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.weatherData.set(null);

    const query = this.searchQuery().trim();


    this.weatherService.getWeather(query).subscribe({
      next: (data) => {
        this.weatherData.set(this.weatherService.transformWeatherData(data));
        this.loading.set(false);
        this.saveToRecentSearches(query);
      },
      error: (err) => {
        console.error('Error fetching weather:', err);
        this.error.set(`Could not find weather for "${query}". Please check the city or country name and try again.`);
        this.loading.set(false);

        setTimeout(() => {
          this.error.set('');
        }, 8000);

      }
    })
  }


  saveToRecentSearches(query: string) {
    let recent = this.recentSearches();
    // Remove if already exists
    recent = recent.filter(item => item.toLowerCase() !== query.toLowerCase());
    // Add to beginning
    recent.unshift(query);
    // Keep only last 5
    recent = recent.slice(0, 5);
    this.recentSearches.set(recent);
    localStorage.setItem('recentSearches', JSON.stringify(recent));
  }

  selectLocation(location: string) {
    this.searchQuery.set(location);
    this.searchWeather();
  }

  clearRecentSearches() {
    this.recentSearches.set([]);
    localStorage.removeItem('recentSearches');
  }


  getWeatherIcon(description: string): string {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder')) return '⛈️';
    if (desc.includes('fog') || desc.includes('mist')) return '🌫️';
    return '🌤️';
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchWeather();
    }
  }



}
