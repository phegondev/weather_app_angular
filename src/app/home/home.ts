import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  stats = [

    { value: '1000+', label: 'Cities Worldwide' },
    { value: 'Real-time', label: 'Live Updates' },
    { value: '24/7', label: 'Weather Monitoring' },
    { value: '100%', label: 'Free Access' }

  ];



  features = [
    {
      icon: '🌍',
      title: 'Global Coverage',
      description: 'Access weather data for any city worldwide, from New York to Tokyo'
    },
    {
      icon: '🌡️',
      title: 'Real-time Updates',
      description: 'Get accurate, up-to-the-minute weather conditions and forecasts'
    },
    {
      icon: '📊',
      title: 'Detailed Metrics',
      description: 'Temperature, humidity, wind speed, pressure, and more'
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Enjoy a modern, intuitive interface with smooth animations'
    },
    {
      icon: '📍',
      title: 'Smart Search',
      description: 'Quickly find any city with our intelligent search feature'
    },
    {
      icon: '⭐',
      title: 'Save Favorites',
      description: 'Save your favorite cities for quick access to weather updates'
    }
  ];



  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Travel Blogger',
      content: 'WeatherApp has been an essential tool for planning my travels. Accurate forecasts every time!',
      avatar: '👩',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Outdoor Enthusiast',
      content: 'The best weather app I\'ve used. Clean interface and reliable data for my hiking trips.',
      avatar: '👨',
      rating: 5
    },
    {
      name: 'Emma Davis',
      role: 'Event Planner',
      content: 'Perfect for planning outdoor events. Never been caught off guard by weather changes.',
      avatar: '👩',
      rating: 5
    }
  ];

}
