import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';




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
      const loginUrl = 'http://172.179.51.100:8080/kyc/auth/login';
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      this.http.post(loginUrl, { email: this.email, password: this.password }, { headers })
        .subscribe({
          next: (response: any) => {
            this.errorMessage = '';
            this.router.navigate(['/admin/dashboard']);
          },
          error: (err) => {
            if (err.status === 401) {
              this.errorMessage = 'Unauthorized: Incorrect email or password';
            } else if (err.status === 400) {
              this.errorMessage = 'Bad Request: Please check your input';
            } else if (err.status === 500) {
              this.errorMessage = 'Server error: Please try again later';
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again.';
            }
            console.error('Login error:', err);
          }
        });
    } else {
      this.errorMessage = 'Please fill in both email and password';
    }
  }
}