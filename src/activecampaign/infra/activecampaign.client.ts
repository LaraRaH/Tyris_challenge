/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/**
 * ActiveCampaignClient
 * ---------------------
 * Propósito:
 * Este cliente encapsula todas las llamadas HTTP a la API externa de ActiveCampaign.
 *
 * Contexto:
 * - La API de ActiveCampaign es REST y requiere autenticación con API Key.
 * - En vez de llamar a axios directamente en los servicios, concentramos
 *   toda la lógica de comunicación en esta clase de infraestructura.
 * - Esto facilita:
 *   - Reutilizar configuración (baseURL, headers).
 *   - Manejar errores, timeouts, retries de forma centralizada.
 *   - Sustituir por un mock en tests.
 *
 * Flujo:
 * - El constructor obtiene la config (baseUrl + apiKey) desde ActiveCampaignAuthService.
 * - Se crea un cliente Axios con esa configuración.
 * - Los métodos implementan endpoints concretos:
 *   - `createContact`: POST /api/3/contacts
 *   - `getContactById`: GET /api/3/contacts/{id}
 *   - `getContactByEmail`: GET /api/3/contacts?email=...
 */

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

  /**
   * Crea un nuevo contacto en ActiveCampaign.
   * Endpoint: POST /api/3/contacts
   * ActiveCampaign espera un body con la forma { contact: { ... } }
   */

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

  /**
   * Busca un contacto por email.
   * Endpoint: GET /api/3/contacts?email=foo@bar.com
   * Si no existe devuelve null.
   */

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
