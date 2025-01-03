import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.usersService.validateUser(email, password);
    const companyName = user.company?.name || 'N/A';

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName,
      },
    };
  }
}
