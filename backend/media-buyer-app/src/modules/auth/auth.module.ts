import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../companies/company.entity';
import { FacebookModule } from './facebook/facebook.module';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company]), FacebookModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
