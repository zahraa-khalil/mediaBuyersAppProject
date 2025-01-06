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
        params: { fields: 'account_id,name' },
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
    console.log(
      '???????????????????????????????????Fetching campaigns for ad account:',
      adAccountId,
    );

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

  async getInsights(adAccountId: string, companyId: number): Promise<any> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company || !company.facebookToken) {
      throw new Error('Company not authenticated with Facebook');
    }

    const accessToken = company.facebookToken;

    const url = `https://graph.facebook.com/v16.0/${adAccountId}/insights`;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          fields: `
            campaign_id,
            campaign_name,
            objective,
            adset_id,
            adset_name,
            ad_id,
            ad_name,
            reach,
            impressions,
            spend,
            cpm,
            cpc,
            ctr,
            actions{action_type,value}
          `.replace(/\s+/g, ''),
          level: 'ad', // Fetch insights at the ad level
          time_range: { since: '2023-01-01', until: '2023-12-31' },
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        'Error fetching insights with actions:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch insights with actions');
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
}
