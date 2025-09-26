/**
 * PurchasesService
 * --------------------
 * Propósito:
 * Este servicio contiene la lógica de negocio para **validar recibos de compra**
 * (purchaseToken) enviados por la app cliente.
 *
 * Contexto:
 * - El cliente (móvil) manda un `purchaseToken` y datos asociados (packageName, productId).
 * - Aquí se valida el token contra la API de Google Play (aún no implementado, solo mock).
 * - El servicio devuelve si la compra es válida, su estado de negocio
 *   (PURCHASED, ACTIVE, CANCELED, etc.) y la respuesta cruda de Google.
 *
 * Estado actual:
 * - Implementación en modo *stub* (con datos falsos).
 * - Muestra el esqueleto de cómo se integraría con la API real.
 *
 * En producción:
 * - Usaría `GoogleAuthService` para crear un cliente autenticado.
 * - Llamaría a la API de Google (purchases.products.get o subscriptionsv2.getPurchase).
 * - Mapearía la respuesta de Google a los estados de negocio internos.
 */

import { Injectable } from '@nestjs/common';
import { ValidateReceiptDto } from '../dtos/validate-receipt.dto';
import { GoogleAuthService } from './google-auth.service';
import {
  GoogleProductPurchase,
  GoogleSubscriptionPurchaseV2,
  PurchaseStatus,
} from '../domain/models';

// Tipo unión: una compra puede ser producto in-app o suscripción
type GooglePurchasePayload =
  | GoogleProductPurchase
  | GoogleSubscriptionPurchaseV2;

@Injectable()
export class PurchasesService {
  constructor(private readonly auth: GoogleAuthService) {}

  async verifyReceipt(dto: ValidateReceiptDto): Promise<{
    valid: boolean; // indica si la compra es válida
    status: PurchaseStatus; // estado de negocio interno
    raw: GooglePurchasePayload; // respuesta cruda de Google (tipada)
  }> {
    // Stub para simular asincronía
    await Promise.resolve();

    // Uso mínimo de dto para evitar warnings de "param no usado".
    const isSubscription = dto.purchaseType === 'subscription';
    const _intent = `${dto.packageName}:${dto.productId}:${isSubscription ? 'subs' : 'inapp'}`;
    void _intent;

    // También se marca auth como usado hasta implementar llamada real.
    void this.auth;

    // Mock tipado: simula respuesta de Google para in-app purchase
    const res: { data: GoogleProductPurchase } = {
      data: { purchaseState: 0, acknowledgementState: 1 },
    };

    // Mapea los datos de Google a un estado de negocio
    const status = this.mapStatus(res.data);
    const valid = status === 'PURCHASED' || status === 'ACTIVE';

    return { valid, status, raw: res.data };
  }

  private mapStatus(googleData: GooglePurchasePayload): PurchaseStatus {
    // Caso 1: productos in-app (campo purchaseState)
    if ('purchaseState' in googleData) {
      switch (googleData.purchaseState) {
        case 0:
          return 'PURCHASED'; // compra realizada
        case 1:
          return 'CANCELED'; // compra cancelada
        case 2:
          return 'PENDING'; // en proceso
        default:
          // eslint-disable-next-line prettier/prettier
          return 'UNKNOWN';   // estado inesperado
      }
    }

    // Caso 2: suscripciones v2 (campo subscriptionState)
    if ('subscriptionState' in googleData) {
      if (googleData.subscriptionState === 1) return 'ACTIVE';
      return 'UNKNOWN';
    }

    // Fallback
    return 'UNKNOWN';
  }
}
