import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FacebookService {
  async getAdAccounts(accessToken: string): Promise<any> {
    const url = `https://graph.facebook.com/v16.0/me/adaccounts`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        fields: 'account_id,name', // Add the 'name' field to the request
      },
    });
    return response.data;
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
}
