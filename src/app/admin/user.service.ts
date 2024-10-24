import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://172.179.51.100:8080/kyc/all-users';  // Your API endpoint
  private usersSubject = new BehaviorSubject<any[]>([]); // To hold users data
  users$ = this.usersSubject.asObservable(); // Expose as observable

  constructor(private http: HttpClient) {}

  // Fetch all users from the backend
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Update users and notify subscribers
  updateUsers(users: any[]) {
    this.usersSubject.next(users); // Update the users in the subject
  }

  // Fetch users and update BehaviorSubject (if needed)
  fetchUsers() {
    this.getUsers().subscribe(users => {
      this.updateUsers(users); // Notify subscribers of the new user list
    }, error => {
      console.error('Error fetching users:', error);
    });
  }
}
