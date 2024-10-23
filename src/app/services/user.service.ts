import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://172.179.51.100:8080/kyc/all-users'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Get the list of all users from the API
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
