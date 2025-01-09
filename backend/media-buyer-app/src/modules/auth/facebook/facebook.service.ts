import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

import { Company } from 'src/modules/companies/company.entity';
import { User } from 'src/modules/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacebookService {
  constructor(
    @InjectRepository(Company) // Tell NestJS to connect to the 'companies' table
    private companyRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // get adaccounts using companyId and reserver token in db
  async getAdAccounts(companyId: number): Promise<any> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company || !company.facebookToken) {
      throw new Error('Company not authenticated with Facebook');
    }

    const accessToken = company.facebookToken;

    const url = `https://graph.facebook.com/v16.0/me/adaccounts`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { fields: 'account_id,name,account_status' },
      });

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Access token expired, re-authentication required');
        throw new Error('Token expired');
      }
      throw new Error('Failed to fetch ad accounts');
    }
  }

  async getCampaigns(adAccountId: string, companyId: number): Promise<any> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });


    if (!company || !company.facebookToken) {
      throw new Error('Company not authenticated with Facebook');
    }

    const accessToken = company.facebookToken;

    const url = `https://graph.facebook.com/v16.0/${adAccountId}/campaigns`;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { fields: 'id,name,status' },
      });

      return response.data;
    } catch (error) {
      console.error(
        'Error fetching campaigns:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch campaigns');
    }
  }

 

  async getInsights(adAccountId: string, companyId: number, timeRange: { since: string; until: string }): Promise<any> {
   
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
  
    if (!company || !company.facebookToken) {
      throw new Error('Company not authenticated with Facebook');
    }
  
    const accessToken = company.facebookToken;
    const url = `https://graph.facebook.com/v16.0`;
  
    try {
      // Batch request payload
      // const batch = [
      //   {
      //     method: 'GET',
      //     relative_url: `${adAccountId}/insights?fields=campaign_id,campaign_name,objective,adset_id,adset_name,ad_id,ad_name,reach,impressions,spend,cpm,cpc,ctr,
      //     actions{action_type,value}
      //     &level=ad`,
      //     time_range: { since: '2023-01-01', until: '2023-12-31' },
      //   },
      //   {
      //     method: 'GET',
      //     relative_url: `${adAccountId}/campaigns?fields=id,name,status`,
      //   },
      // ];

      const batch = [
        {
          method: 'GET',
          relative_url: `${adAccountId}/insights?fields=campaign_id,campaign_name,objective,adset_id,adset_name,ad_id,ad_name,reach,impressions,spend,cpm,cpc,ctr,actions{action_type,value}&level=campaign&time_range={"since":"${timeRange.since}","until":"${timeRange.until}"}`,
        },
        {
          method: 'GET',
          relative_url: `${adAccountId}/campaigns?fields=id,name,effective_status`,
        },
      ];
  
      const response = await axios.post(
        `${url}`,
        {
          access_token: accessToken,
          batch: batch,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
  
      // Parse the batch response
      const [insightsResponse, campaignsResponse] = response.data;
  
      const insights = JSON.parse(insightsResponse.body).data;
      const campaigns = JSON.parse(campaignsResponse.body).data;
  
      // Merge insights with campaign status
      const insightsWithStatus = insights.map((insight: any) => { 
        const campaign = campaigns.find((c: any) => c.id === insight.campaign_id);
        return {
          ...insight,
          campaign_status: campaign?.effective_status || 'Unknown',
        };
      });
     
      return insightsWithStatus;
    } catch (error) {
      console.error(
        'Error fetching batch insights and campaign status:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch batch insights and campaign status');
    }
  }

  


  async updateCompanyAuthStatus(
    companyId: number,
    isAuthenticated: boolean,
    accessToken?: string,
  ): Promise<boolean> {
    try {
      const company = await this.companyRepository.findOne({
        where: { id: companyId },
      });

      if (!company) {
        console.error(`Company with ID ${companyId} not found`);
        return false;
      }

      company.facebookAuthenticated = isAuthenticated;

      // If accessToken is provided, update it as well
      if (accessToken) {
        company.facebookToken = accessToken; // Ensure `facebookToken` exists in your database schema
      }

      await this.companyRepository.save(company);

      return true;
    } catch (error) {
      console.error('Failed to update company auth status:', error);
      return false;
    }
  }





  // DASHBOARD APIS



  // get adaccounts with spend data
  async getAdAccountSpend(companyId: number, timeRange: { since: string; until: string }): Promise<any> {
    // Fetch company and access token
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
  
    if (!company || !company.facebookToken) {
      throw new Error('Company not authenticated with Facebook');
    }
  
    const accessToken = company.facebookToken;
  
    // Fetch ad accounts
    const adAccountsResponse = await this.getAdAccounts(companyId);
    const adAccounts = adAccountsResponse.data;
  
    if (!adAccounts || adAccounts.length === 0) {
      throw new Error('No ad accounts found for this company');
    }

    const activeAdAccounts = adAccounts.filter((account) => account.account_status != 101);


    if (!activeAdAccounts.length) {
      throw new Error('No active ad accounts found');
    }

    console.log(`Active Ad Accounts: ??????????????????????????????`, activeAdAccounts);

  
    // Build batch requests for spend
    const batch = activeAdAccounts.map((account) => ({
      method: 'GET',
      relative_url: `act_${account.account_id}/insights?fields=spend&time_range={"since":"${timeRange.since}","until":"${timeRange.until}"}`,
    }));
   


    try {
      const response = await axios.post(
        `https://graph.facebook.com/v16.0`,
        {
          access_token: accessToken,
          batch: batch,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
   
  
      // Parse batch response
      const spendData = response.data.map((res, index) => {

        if (res.code === 200) {
          const data = JSON.parse(res.body).data;

          return {
            adAccountName: activeAdAccounts[index].name,
            adAccountId: activeAdAccounts[index].account_id,
            adAccountStatus: activeAdAccounts[index].account_status,
            spend: data.length > 0 ? data[0].spend : '0.00',
          };
        } else {
          console.error(`Error fetching data for ${activeAdAccounts[index].account_id}:`, res.body);
          return {
            adAccountName: activeAdAccounts[index].name,
            adAccountId: activeAdAccounts[index].account_id,
            adAccountStatus: activeAdAccounts[index].account_status,
            spend: 'Error',
          };
        }
      });
  
      return spendData;
    } catch (error) {
      console.error('Error fetching ad account spend:', error.response?.data || error.message);
      throw new Error('Failed to fetch spend data for ad accounts');
    }
  }
  

}
