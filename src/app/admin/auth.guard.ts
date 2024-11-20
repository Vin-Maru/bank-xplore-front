import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if we are in a browser environment (e.g., checking window existence)
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      
      // If token exists, allow navigation to the route
      if (token) {
        return true;
      }
    }
    
    // Otherwise, redirect to login
    this.router.navigate(['/admin/login']);
    return false;
  }
}
