import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  authService = inject(AuthService);
  router: Router = inject(Router);

  login() {
    this.authService.login();
    this.router.navigate(['/tasks']);
  }
}
