import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}




  addTeam(obj: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/team-members/add-members`, obj);
  }


  getTeamMemebersByCompany(companyId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/team-members/list?companyId=${companyId}`);
  }





}
