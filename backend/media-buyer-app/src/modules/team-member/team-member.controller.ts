import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { AddTeamMembersDto } from './dtos/addTeamMembers.dto';

@Controller('team-members')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  // Admin adds team members
  @Post('add-members')
  async addTeamMembers(@Body() addTeamMembersDto: AddTeamMembersDto) {
    const results = await this.teamMemberService.addTeamMembers(addTeamMembersDto); // Pass the entire DTO
    return results;
  }

  // User registers
  @Post('register')
  async registerTeamMember(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const user = await this.teamMemberService.registerTeamMember(name, email, password);
      return { message: 'Registration successful.', user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


@Get('/list')
async getTeamMembers(
  @Query('companyId') companyId: number,
): Promise<{ name: string; email: string; role: string; status: string }[]> {
  const teamMembers = await this.teamMemberService.getTeamMembersByCompany(companyId);

  return teamMembers.map((member) => ({
    name: member.user?.name || member.name, // Use the name from the user if registered, otherwise from the team member
    email: member.user?.email || member.email,
    role: member.role,
    status: member.status, // Check if the user is registered
  }));
}

}