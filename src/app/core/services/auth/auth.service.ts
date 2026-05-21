import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoggedIn = signal(false);
    
    
  login() {
    this.isLoggedIn.set(true);
    localStorage.setItem('auth', 'true');
  }

  
  logout() {
    this.isLoggedIn.set(false);
    localStorage.removeItem('auth');
  }

  
  checkAuth() {
    return localStorage.getItem('auth') === 'true';
  }


}
