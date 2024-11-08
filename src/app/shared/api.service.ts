import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://34.28.208.64:8080/kyc/admin'; // Base URL

  constructor(private http: HttpClient) {}

  // Helper function to build full API URL
  private buildUrl(endpoint: string): string {
    return `${this.apiUrl}${endpoint}`;
  }

  // Function to make a GET request
  get(endpoint: string, headers?: HttpHeaders): Observable<any> {
    const url = this.buildUrl(endpoint); // Construct the full URL
    return this.http.get(url, { headers });
  }

  // Function to make a POST request
  post(endpoint: string, payload: any, headers?: HttpHeaders): Observable<any> {
    const url = this.buildUrl(endpoint); // Construct the full URL
    return this.http.post(url, payload, { headers });
  }

  // Function to make a PUT request
  put(endpoint: string, payload: any, headers?: HttpHeaders): Observable<any> {
    const url = this.buildUrl(endpoint); // Construct the full URL
    return this.http.put(url, payload, { headers });
  }

  // Function to make a DELETE request
  delete(endpoint: string, headers?: HttpHeaders): Observable<any> {
    const url = this.buildUrl(endpoint); // Construct the full URL
    return this.http.delete(url, { headers });
  }

  // Helper function to get headers with authorization
  public getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `keyring_0 ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
