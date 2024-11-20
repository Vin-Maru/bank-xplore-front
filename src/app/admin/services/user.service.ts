import { Injectable, Inject, PLATFORM_ID, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <-- Import map operator
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://34.28.208.64:8080';  // Base API URL

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID to check platform
  ) {}

  // Fetch all users with an authorization token
  fetchUsers(): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.apiUrl}/kyc/admin/all-users`, { headers });
  }

  // Create a new bank
  createBank(payload: any): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/kyc/admin/create-bank`, payload, { headers });
  }

  // Approve a user
  approveUser(email: string): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const payload = {
      email: email,
      verified: true, // Set verified to true to approve the user
    };

    return this.http.post<any>(`${this.apiUrl}/kyc/admin/verify`, payload, { headers });
  }

  // Decline a user
  declineUser(email: string): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  
    const payload = {
      email: email,
      verified: false, // Decline logic, confirm with backend
    };
  
    return this.http.post<any>(`${this.apiUrl}/kyc/admin/verify`, payload, { headers });
  }
  

  // Fetch users with 'Deactivated' account status
  fetchPendingApprovalUsers(): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/kyc/admin/all-users`, { headers }).pipe(
      map(data => {
        // Filter users with account_action 'DEACTIVATED' and return the count
        const deactivatedUsers = data.payload.filter((item: any) => item.user.account_action === 'DEACTIVATED');
        return deactivatedUsers.length; // Returns the count of deactivated users
      })
    );
  }
  getBanks() {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.apiUrl}/banking/api/banks`, { headers });
  }
  deleteUser(email: string): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const url = `${this.apiUrl}/kyc/delete/?email=${email}`; // Use backticks for template literals
    return this.http.delete(url);
  }
  bankTransaction(): Observable<any[]> {
    const token = this.getAuthToken(); // Get the token from your storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const url = `${this.apiUrl}/banking/kcb/transactions/view/all?page=0&size=20`;
    return this.http.get<any[]>(url, { headers });
  }
  
  login(token: string): void {
    localStorage.setItem('token', token);
  }
 


  logout(): void {
    localStorage.removeItem('token');
  }
  
  // Helper method to get the token with platform check
  private getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;  // Return null if not in browser environment
  }
}
