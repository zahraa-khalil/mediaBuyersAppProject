import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { Client } from './entities/clients.entity';
import { TeamMember } from './entities/team_members.entity';
import { Company } from './entities/company.entity';
import { User } from './entities/user.entity';
import { Report } from './entities/reports.entity';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(), // Load .env variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // Use environment variable
      port: parseInt(process.env.DB_PORT, 10), // Convert to a number
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Set to false in production
      logging: true,
    }),
    TypeOrmModule.forFeature([Company, User, TeamMember, Client, Report]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
