/**
 * GooglePlayModule
 * ----------------
 * Propósito:
 * Este módulo agrupa toda la funcionalidad relacionada con Google Play:
 * - Endpoints para verificar recibos y recibir notificaciones RTDN.
 * - Servicios de negocio (compras, notificaciones).
 * - Servicios de infraestructura (autenticación con Google, verificación de firma).
 *
 * Contexto:
 * - En NestJS, un módulo sirve para organizar código por dominio/lógica.
 * - Aquí reunimos controladores y servicios bajo un mismo "GooglePlayModule".
 * - Facilita importar este módulo en `AppModule` u otros módulos sin
 *   tener que registrar cada servicio/controlador por separado.
 */

import { Module } from '@nestjs/common';
import { PurchasesController } from './controllers/purchases.controller';
import { RTDNController } from './controllers/rtdn.controller';
import { PurchasesService } from './services/purchases.service';
import { RTDNService } from './services/rtdn.service';
import { GoogleAuthService } from './services/google-auth.service';
import { SignatureVerifierService } from './services/signature-verifier.service';

@Module({
  // Controladores: definen los endpoints HTTP expuestos
  controllers: [PurchasesController, RTDNController],

  // Providers: lógica de negocio e infraestructura que se inyecta vía DI
  providers: [PurchasesService, RTDNService, GoogleAuthService, SignatureVerifierService],

  // Exports: qué parte de este módulo puede usarse en otros módulos
  // (ej: si otro módulo necesita usar PurchasesService)
  exports: [PurchasesService],
})
export class GooglePlayModule {}
