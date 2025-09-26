import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactsController } from './controllers/contacts.controller';
import { ContactsService } from './services/contacts.service';
import { ActiveCampaignAuthService } from './services/activecampaign-auth.service';
import { ActiveCampaignClient } from './infra/activecampaign.client';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ContactsController],
  providers: [ContactsService, ActiveCampaignAuthService, ActiveCampaignClient],
  exports: [ContactsService],
})
export class ActiveCampaignModule {}
