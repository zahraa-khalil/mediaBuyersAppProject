import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FacebookService } from './facebook.service';

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
  async facebookLoginCallback(@Req() req: any): Promise<any> {
    const user = req.user; // Retrieved from FacebookStrategy
    console.log('Facebook User:', user);

    // Example: Fetch ad accounts using the access token
    const adAccounts = await this.facebookService.getAdAccounts(
      user.accessToken,
    );
    console.log('Ad Accounts:', adAccounts);

    return {
      user,
      adAccounts, // Return user info and ad accounts as an example
    };
  }
}
