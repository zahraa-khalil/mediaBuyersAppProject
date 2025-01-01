import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../companies/company.entity';


// ???

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
