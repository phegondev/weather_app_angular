import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isMenuOpen = signal(false);

  constructor(public authService: AuthService) { }


  toggleMenu() {
    this.isMenuOpen.update(value => !value)
  }

  logout() {
    this.authService.logout()
  }

}
