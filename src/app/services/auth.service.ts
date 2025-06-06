import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly validEmail = 'hr@example.com';
  private readonly validPassword = 'password123';

  login(email: string, password: string): boolean {
    if (email === this.validEmail && password === this.validPassword) {
      localStorage.setItem('token', 'mock-jwt-token');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
