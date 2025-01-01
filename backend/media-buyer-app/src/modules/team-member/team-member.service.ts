import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from '../team-member/team_members.entity';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { Company } from '../companies/company.entity';
import { AddTeamMembersDto } from './dtos/addTeamMembers.dto';
@Injectable()

export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Add this line

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async addTeamMembers(addTeamMembersDto: AddTeamMembersDto) {
    const { companyId, members } = addTeamMembersDto;
  
    console.log('Company ID:', companyId);
    console.log('Members:', members);
  
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new Error('Company not found.');
    }
  
    for (const member of members) {
      console.log('Adding member:', member);
      const teamMember = this.teamMemberRepository.create({
        company,
        name: member.name,
        email: member.email,
        role: member.role,
      });
      await this.teamMemberRepository.save(teamMember);
    }
  
    return { message: 'Team members added successfully.' };
  }
  

  async registerTeamMember(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    // Check if the team member is invited
    const teamMember = await this.teamMemberRepository.findOne({
      where: { email },
      relations: ['company'], // Ensure you fetch the related company
    });
  
    if (!teamMember) {
      throw new BadRequestException('Team member not found. Please contact your admin.');
    }
  
    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = this.userRepository.create({
      name,
      email,
      passwordHash: hashedPassword,
      role: teamMember.role, // Use the role from the team member record
      company: teamMember.company, // Link the user to the same company as the team member
    });
  
    // Save the new user
    await this.userRepository.save(user);
  
    // Update the team member record to reflect the registration
    teamMember.user = user;
    teamMember.status = 'registered';
    await this.teamMemberRepository.save(teamMember);
  
    return user;
  }
  


  async getTeamMembersByCompany(companyId: number): Promise<TeamMember[]> {
    // Fetch all team members of the given company
    const teamMembers = await this.teamMemberRepository.find({
      where: { company: { id: companyId } },
      relations: ['company'], // Ensure the company relation is included
    });
  
    return teamMembers;
  }

  
}