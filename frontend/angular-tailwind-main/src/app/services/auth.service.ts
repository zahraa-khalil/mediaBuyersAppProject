import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
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

}
