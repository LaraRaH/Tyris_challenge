import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActiveCampaignModule } from './activecampaign/activecampaign.module';

@Module({
  imports: [ActiveCampaignModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
