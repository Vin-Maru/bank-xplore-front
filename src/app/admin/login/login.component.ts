import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule], // Ensure HttpClientModule is imported here
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    // Simulate dummy credentials
    const dummyUsername = 'admin';
    const dummyPassword = 'admin123';
  
    // Check if the username and password entered by the user match the dummy values
    if (this.username === dummyUsername && this.password === dummyPassword) {
      // Simulate successful login
      console.log('Login successful');
      this.router.navigate(['admin/dashboard']); // Redirect to the dashboard
    } else {
      // Simulate login failure
      this.errorMessage = 'Invalid username or password';
    }
  }
  


 /*login() {
    if (this.username && this.password) {
      const loginUrl = 'http://localhost:5000/api/login'; // Set your API endpoint here

      this.http.post(loginUrl, { username: this.username, password: this.password })
        .subscribe({
          next: (response: any) => {
            this.router.navigate(['/dashboard']); // Redirect to dashboard on success
          },
          error: (err) => {
            this.errorMessage = 'Invalid username or password';
            console.error(err);
          }
        });
    } else {
      this.errorMessage = 'Please fill in both fields';
    }
  }
}*/}
