import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;  // New state for loading

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (this.email && this.password) {
      const loginUrl = 'http://172.179.51.100:8080/kyc/auth/login'; // Set your API endpoint here
  
      this.http.post(loginUrl, { email: this.email, password: this.password })
        .subscribe({
          next: (response: any) => {
            // Clear any existing error messages
            this.errorMessage = '';
  
            // Assuming successful response, redirect to dashboard
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            // Check for specific error cases
            if (err.status === 401) {
              this.errorMessage = 'Unauthorized: Incorrect email or password';
            } else if (err.status === 400) {
              this.errorMessage = 'Bad Request: Please check your input';
            } else if (err.status === 500) {
              this.errorMessage = 'Server error: Please try again later';
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again.';
            }
  
            // Log the error for debugging
            console.error('Login error:', err);
          }
        });
    } else {
      // If fields are missing, set an error message
      this.errorMessage = 'Please fill in both email and password';
    }
  }
}