import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(obj: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, obj);
  }

  register(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, obj);
  }

  logout() {
    // Clear user data from local storage or wherever you store it
    // localStorage.removeItem('token');
  }

  // Check Facebook authentication status for a company
  checkCompanyAuthStatus(companyId: number): Observable<{ isAuthenticated: boolean }> {
    return this.http.get<{ isAuthenticated: boolean }>(`${this.apiUrl}/auth/facebook/company-auth-status/${companyId}`);
  }

  // Check Facebook authentication status for a user
  checkUserAuthStatus(userId: number): Observable<{ isAuthenticated: boolean }> {
    return this.http.get<{ isAuthenticated: boolean }>(`${this.apiUrl}/auth/facebook/user-auth-status/${userId}`);
  }

  initiateFacebookAuth() {
    const authUrl = `http://localhost:3000/auth/facebook`;
    console.log('Auth URL:', authUrl); // Debugging
    window.location.href = authUrl;
  }


  initiateFacebookReAuthentication(){
    window.location.href = 'http://localhost:3000/auth/facebook/reauthenticate';
  }
}
