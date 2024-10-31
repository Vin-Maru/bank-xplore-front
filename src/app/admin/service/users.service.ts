import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usercount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `keyring_0 ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any[]>('http://172.179.51.100:8080/kyc/all-users', { headers }).pipe(
      map(response => {
        if (response && Array.isArray(response['payload'])) {
          this.usercount.next(response['payload'].length); // Update user count
          return response['payload']; // Return the payload array as users
        } else {
          console.error('Unexpected response structure:', response);
          return [];
        }
      })
    );
  }

  fetchUserDocuments(email: string): Observable<any> {
    return this.http.get<any>(`http://172.179.51.100:8080/kyc/admin/all-users`).pipe(
      map(response => response.documents || []) // Map documents or return an empty array if none
    );
  }

  approveUser(user: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `keyring_0 ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put(`http://172.179.51.100:8080/kyc/all-users/${user.user_id}`, { status: 'Logged In' }, { headers });
  }

  declineUser(user: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `keyring_0 ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete(`http://172.179.51.100:8080/kyc/all-users/${user.user_id}`, { headers });
  }

  getUserCount(): Observable<number> {
    return this.usercount.asObservable();
  }
}
