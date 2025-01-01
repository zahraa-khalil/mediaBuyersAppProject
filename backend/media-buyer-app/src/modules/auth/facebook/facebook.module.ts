import { Module } from '@nestjs/common';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';
import { FacebookStrategy } from './faebook.strategy';

@Module({
  controllers: [FacebookController],
  providers: [FacebookService, FacebookStrategy],
  // FacebookStrategy
})
export class FacebookModule {}
