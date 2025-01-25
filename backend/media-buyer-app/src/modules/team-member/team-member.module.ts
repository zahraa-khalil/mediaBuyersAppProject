import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { TeamMemberController } from './team-member.controller';
import { TeamMemberService } from './team-member.service';
import { TeamMember } from './team_members.entity';
import { Company } from '../companies/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember, User, Company])],
  providers: [TeamMemberService],
  controllers: [TeamMemberController],
})
export class TeamMemberModule {}
