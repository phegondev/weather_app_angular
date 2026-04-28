import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  email = signal('');
  password = signal('');

  error = signal('');
  loading = signal(false);
  showPassword = signal(false);


  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }



  togglePasswordVisibility() {
    this.showPassword.update(value => !value)
  }

  onSubmit() {

    if (!this.email() || !this.password()) {
      this.error.set('Please fill in all fields');
      return;
    }


    this.loading.set(true);
    this.error.set('');

    const isSuccess = this.authService.login(this.email(), this.password());

    if (isSuccess) {
      this.loading.set(false);
      this.router.navigate(['/weather']);
    } else {

      this.loading.set(false);
      this.error.set("Invalid User or Password");

      setTimeout(() => {
        this.error.set('')
      }, 5000)
    }
  }
}

