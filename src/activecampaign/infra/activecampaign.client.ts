/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
import { ActiveCampaignAuthService } from '../services/activecampaign-auth.service';
import { ACContact } from '../domain/models';

@Injectable()
export class ActiveCampaignClient {
  private http!: AxiosInstance;

  constructor(private readonly auth: ActiveCampaignAuthService) {
    const { baseUrl, apiKey } = this.auth.getConfig();
    this.http = axios.create({
      baseURL: baseUrl,
      headers: {
        'Api-Token': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 10_000,
    });
  }

  // POST /api/3/contacts
  async createContact(payload: {
    email: string;
    firstName?: string;
    lastName?: string;
  }): Promise<ACContact> {
    // ActiveCampaign espera { contact: { ... } }
    const body = { contact: payload };
    const res = await this.http.post('/api/3/contacts', body);
    const c = res.data?.contact;
    return {
      id: String(c?.id ?? ''),
      email: c?.email ?? payload.email,
      firstName: c?.firstName,
      lastName: c?.lastName,
    };
  }

  // GET /api/3/contacts/{id}
  async getContactById(id: string): Promise<ACContact> {
    const res = await this.http.get(`/api/3/contacts/${id}`);
    const c = res.data?.contact;
    return {
      id: String(c?.id ?? id),
      email: c?.email ?? '',
      firstName: c?.firstName,
      lastName: c?.lastName,
    };
  }

  // GET /api/3/contacts?email=foo@bar.com
  async getContactByEmail(email: string): Promise<ACContact | null> {
    const res = await this.http.get('/api/3/contacts', { params: { email } });
    const list = res.data?.contacts ?? [];
    if (!Array.isArray(list) || list.length === 0) return null;
    const c = list[0];
    return {
      id: String(c?.id ?? ''),
      email: c?.email ?? email,
      firstName: c?.firstName,
      lastName: c?.lastName,
    };
  }
}
