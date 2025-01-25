import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Company } from '../companies/company.entity';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Company) // Tell NestJS to connect to the 'companies' table
    private companyRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Register a new company
  async registerCompany(
    name: string,
    email: string,
    password: string,
  ): Promise<Company> {
    // Check if email is already in use
    const existingCompany = await this.companyRepository.findOne({
      where: { email },
    });
    if (existingCompany) {
      throw new Error('Company with this email already exists');
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new company
    const newCompany = this.companyRepository.create({
      name,
      email,
      passwordHash,
    });

    // Save the company in the database
    return this.companyRepository.save(newCompany);
  }

  // Log in a company
  async loginCompany(email: string, password: string): Promise<Company> {
    // Find the company by email
    const company = await this.companyRepository.findOne({ where: { email } });
    if (!company) {
      throw new Error('Invalid email or password');
    }

    // Compare the given password with the hashed one
    const isPasswordValid = await bcrypt.compare(
      password,
      company.passwordHash,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // If everything is okay, return the company
    return company;
  }

  // Check if a company has authenticated with Facebook
  async checkCompanyFacebookAuthStatus(
    companyId: number,
  ): Promise<{ isAuthenticated: boolean }> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    return { isAuthenticated: !!company?.facebookAuthenticated };
  }

  // Check if a user has authenticated with Facebook
  async checkUserFacebookAuthStatus(
    userId: number,
  ): Promise<{ isAuthenticated: boolean }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return { isAuthenticated: !!user?.facebookAuthenticated };
  }

  async updateFacebookAuthStatus(userId: string): Promise<void> {
    await this.userRepository.update(userId, { facebookAuthenticated: true });
  }






}
