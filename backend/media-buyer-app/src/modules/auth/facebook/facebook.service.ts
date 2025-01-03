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
    const company = await this.companyRepository.findOne({ where: { id: companyId } });

    if (!company || !company.facebookToken) {
      throw new Error('Company not authenticated with Facebook');
    }

    const url = `https://graph.facebook.com/v16.0/me/adaccounts`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${company.facebookToken}` },
        params: { fields: 'account_id,name' },
      });

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Token expired, user needs to re-authenticate');
        throw new Error('Token expired');
      }
      throw error;
    }
  }


  async getCampaigns(adAccountId: string, accessToken: string): Promise<any> {
    const url = `https://graph.facebook.com/v16.0/${adAccountId}/campaigns?fields=id,name,status`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  async getInsights(adAccountId: string, accessToken: string): Promise<any> {
    const url = `https://graph.facebook.com/v16.0/${adAccountId}/insights?fields=impressions,clicks,spend`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }


  async updateCompanyAuthStatus(companyId: number, isAuthenticated: boolean, accessToken?: string): Promise<boolean> {
    try {
      const company = await this.companyRepository.findOne({ where: { id: companyId } });

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
