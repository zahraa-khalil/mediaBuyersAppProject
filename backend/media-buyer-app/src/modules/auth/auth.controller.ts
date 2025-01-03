import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // API endpoint for registering a company
  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.registerCompany(name, email, password);
  }

  // API endpoint for logging in a company
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.loginCompany(email, password);
  }


  @Get('facebook/company-auth-status/:companyId')
  async checkCompanyFacebookAuthStatus(@Param('companyId') companyId: number) {
    return this.authService.checkCompanyFacebookAuthStatus(companyId);
  }
  
  @Get('facebook/user-auth-status/:userId')
  async checkUserFacebookAuthStatus(@Param('userId') userId: number) {
    return this.authService.checkUserFacebookAuthStatus(userId);
  }
  


  
}
