import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('authToken'); // Correct key
      if (token) {
        return true; // User is authenticated
      }
    }
    // Redirect to login if the user is not authenticated
    this.router.navigate(['/admin/login']);
    return false;
  }
}
