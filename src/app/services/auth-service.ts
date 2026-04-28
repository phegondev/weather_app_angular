import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';




export interface User {
  email: string,
  password: string,
  name: string
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {


  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();

  constructor(private router: Router) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSignal.set(JSON.parse(savedUser));
    }
  }

  getUsers(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  register(user: User): boolean {

    const users = this.getUsers();
    //check if user already exist
    if (users.find(u => u.email === user.email)) {
      return false;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;

  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      this.currentUserSignal.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }

    return false;
  }


  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSignal() != null;
  }


}
