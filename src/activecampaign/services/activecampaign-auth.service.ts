/**
 * ActiveCampaignAuthService
 * --------------------------
 * Propósito:
 * Este servicio centraliza el acceso a las credenciales de ActiveCampaign.
 *
 * Contexto:
 * - La API de ActiveCampaign exige:
 *   - Un `baseUrl` único de tu cuenta (ej: https://youraccount.api-us1.com).
 *   - Una API Key privada para autenticar cada request.
 * - En lugar de leer estas variables de entorno en cada sitio,
 *   concentramos la lógica aquí para mayor limpieza y reutilización.
 *
 * Flujo:
 * - Usa `ConfigService` de @nestjs/config para leer variables de entorno.
 * - Devuelve un objeto `{ baseUrl, apiKey }`.
 * - Si faltan datos, en producción deberíamos lanzar un error o
 *   impedir que la app arranque (para no hacer llamadas inválidas).
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ActiveCampaignAuthService {
  constructor(private readonly config: ConfigService) {}

  /**
   * Lee y devuelve la configuración necesaria para conectar con ActiveCampaign.
   * Variables esperadas en .env:
   *   AC_BASE_URL=https://YOUR_ACCOUNT.api-us1.com
   *   AC_API_KEY=xxxxxxxxxxxxxxxx
   */

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
