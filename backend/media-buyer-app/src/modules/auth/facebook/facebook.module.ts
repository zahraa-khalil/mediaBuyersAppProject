import { Module } from '@nestjs/common';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';
import { FacebookStrategy } from './faebook.strategy';
import { AuthService } from '../auth.service';
import { AuthModule } from '../auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/user.entity';
import { Company } from 'src/modules/companies/company.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Company, User]), // Register Company and User repositories
  ],
  controllers: [FacebookController],
  providers: [FacebookService, FacebookStrategy],


})
export class FacebookModule {}
