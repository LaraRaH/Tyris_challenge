import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ActiveCampaignAuthService {
  constructor(private readonly config: ConfigService) {}

  getConfig(): { baseUrl: string; apiKey: string } {
    // En .env:
    // AC_BASE_URL=https://YOUR_ACCOUNT.api-us1.com
    // AC_API_KEY=xxxx
    const baseUrl = this.config.get<string>('AC_BASE_URL') ?? '';
    const apiKey = this.config.get<string>('AC_API_KEY') ?? '';
    if (!baseUrl || !apiKey) {
      // En real: lanza error configurable o usa guard de healthcheck
      // throw new Error('ActiveCampaign config missing');
    }
    return { baseUrl, apiKey };
  }
}
