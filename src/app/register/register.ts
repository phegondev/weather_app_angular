import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  name = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');

  error = signal('');
  loading = signal(false);
  showPassword = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  togglePasswordVisibility(){
    this.showPassword.update(value => !value)
  }

  onSubmit() {

    if (!this.name() || !this.email() || !this.password() || !this.confirmPassword()) {
      this.error.set('Please fill in all fields');
      return;
    }

    if (this.password() !== this.confirmPassword()) {

      this.error.set('Password do not match');

      setTimeout(() => {
        this.error.set('')
      }, 5000)
      
      return;
    }

    if (this.password().length < 4) {
      this.error.set('Password must be at least 4 characters');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const isSuccess = this.authService.register({
      name: this.name(),
      email: this.email(),
      password: this.password()
    });

    if (isSuccess) {
      this.loading.set(false);
      this.router.navigate(['/login']);
    } else {
      this.loading.set(false);
      this.error.set("User aleady exist with this email");

      setTimeout(() => {
        this.error.set('')
      }, 5000)
    }
  }
}
