import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActiveCampaignModule } from './activecampaign/activecampaign.module';
import { GooglePlayModule } from './google-play/google-play.module';

@Module({
  imports: [ActiveCampaignModule, GooglePlayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
