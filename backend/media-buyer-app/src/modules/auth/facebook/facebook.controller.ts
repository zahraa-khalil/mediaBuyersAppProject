import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FacebookService } from './facebook.service';
import { Response } from 'express';
import { AuthService } from '../auth.service';

@Controller('auth/facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<void> {
    // Initiates Facebook OAuth flow
    // This redirects the user to Facebook's login page
  }

  @Get('callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<void> {
    const user = req.user; // Retrieved from FacebookStrategy
    console.log('Facebook User:', user);
    // Example: Fetch ad accounts using the access token
    // const adAccounts = await this.facebookService.getAdAccounts(
    //   user.accessToken,
    // );

    // Redirect to your frontend app with necessary data
    const frontendUrl = `http://localhost:4200/auth/facebook-auth-callback?accessToken=${user.accessToken}`;
    res.redirect(frontendUrl);
  }

  @Post('company-auth-callback')
  async handleCompanyAuthCallback(
    @Body() body: any,
    @Res() res: Response,
  ): Promise<void> {

    const { accessToken, companyId } = body;

    if (!accessToken || !companyId) {
      console.error('Missing required fields: accessToken or companyId');
      res.status(400).send({ message: 'Missing accessToken or companyId' });
      return;
    }
  
  console.log('Company Auth Callback Received:', { accessToken, companyId });

  try {
     // Save accessToken and update authentication status in the database
     const isUpdated = await this.facebookService.updateCompanyAuthStatus(companyId, true, accessToken);

     if (isUpdated) {
      console.log(`Company ${companyId} authenticated successfully`);
      res.status(200).send({ message: 'Company authenticated successfully' });
    } else {
      console.error(`Failed to update company authentication data for ID ${companyId}`);
      res.status(500).send({ message: 'Failed to update authentication data' });
    }
  } catch (error) {
    console.error('Error during company authentication callback:', error);
    res.status(500).send({ message: 'Internal server error' });

  }
}

@Get('reauthenticate')
@UseGuards(AuthGuard('facebook'))
async reAuthenticate(@Query('companyId') companyId: number, @Res() res: Response): Promise<void> {
  try {
    const newToken = 'new_facebook_token'; // Replace with real token retrieval logic
    await this.facebookService.updateCompanyAuthStatus(companyId, true ,newToken);

    res.status(200).send({ message: 'Re-authentication successful', token: newToken });
  } catch (error) {
    console.error('Re-authentication failed:', error);
    res.status(500).send({ message: 'Re-authentication failed' });
  }
}


// get insights using adAccountId and reserver token in db
@Get('ad-accounts/:companyId')
  async fetchAdAccounts(@Param('companyId') companyId: number): Promise<any> {
    try {
      const adAccounts = await this.facebookService.getAdAccounts(companyId);
      return { success: true, adAccounts };
    } catch (error) {
      console.error('Error fetching ad accounts:', error.message);
      throw new HttpException('Failed to fetch ad accounts', HttpStatus.BAD_REQUEST);
    }
  }


    /**
   * Fetch Campaigns for a Specific Ad Account
   * Endpoint: GET /facebook/campaigns/:adAccountId/:companyId
   */
    @Get('campaigns/:adAccountId/:companyId')
    async fetchCampaigns(
      @Param('adAccountId') adAccountId: string,
      @Param('companyId') companyId: number,
    ): Promise<any> {
      try {
        const campaigns = await this.facebookService.getCampaigns(adAccountId, companyId);
        return { success: true, campaigns };
      } catch (error) {
        console.error('Error fetching campaigns:', error.message);
        throw new HttpException('Failed to fetch campaigns', HttpStatus.BAD_REQUEST);
      }
    }
  /**
   * Fetch Insights for an Ad Account
   * Endpoint: GET /facebook/insights/:adAccountId/:companyId
   */
  @Get('insights/:adAccountId/:companyId')
  async fetchInsights(
    @Param('adAccountId') adAccountId: string,
    @Param('companyId') companyId: number,
    @Query('since') since: string,
    @Query('until') until: string,
  ): Promise<any> {
    try {
      const timeRange = { since, until };
     
      if (!since || !until) {
        throw new Error('Both "since" and "until" dates are required');
      }
      if (new Date(since) > new Date(until)) {
        throw new Error('"since" date cannot be after "until" date');
      }

      // Fetch insights for campaigns
      const insights = await this.facebookService.getInsights(adAccountId, companyId, timeRange);
      return { success: true, insights };
    } catch (error) {
      console.error('Error fetching insights:', error.message);
      throw new HttpException('Failed to fetch insights', HttpStatus.BAD_REQUEST);
    }
  }






  // DASHBOARD APIS

  // ADACCOUNT WITH SPEND
  @Get('adaccounts/spend/:companyId')
  async getAdAccountSpend(
    @Param('companyId') companyId: number,
    @Query('since') since: string,
    @Query('until') until: string,
  ): Promise<any> {
    const timeRange = { since, until };

    return this.facebookService.getAdAccountSpend(companyId, timeRange);
  }
}

  