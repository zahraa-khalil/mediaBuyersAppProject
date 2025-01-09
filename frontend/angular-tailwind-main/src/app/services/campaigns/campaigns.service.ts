import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}




  getAdAccounts(companyId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/facebook/ad-accounts/${companyId}`, {responseType: 'json'});
  }


  getCampaignsByAdAccount(adAccountId: any, companyId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/facebook/campaigns/${adAccountId}/${companyId}`);
  }


  getInsigntsByAdAccount(adAccountId: any, companyId: any, timeRange: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/facebook/insights/${adAccountId}/${companyId}?since=${timeRange.since}&until=${timeRange.until}`);
  }


}
