/**
 * RTDNService
 * --------------------
 * Propósito:
 * Este servicio procesa las notificaciones **RTDN** (Real-Time Developer Notifications)
 * que Google Play envía a través de Pub/Sub.
 *
 * Contexto:
 * - Google Play publica mensajes en Pub/Sub cuando ocurre un evento (compra, renovación,
 *   cancelación, etc.).
 * - Pub/Sub hace un push HTTP a nuestro endpoint `/google-play/rtdn`.
 * - Este servicio decodifica y traduce esos mensajes a eventos de negocio.
 *
 * Estado actual:
 * - Mock/stub: solo hace log de los eventos recibidos.
 * - Incluye TODOs para persistir en BD o emitir eventos internos en el futuro.
 *
 * En producción:
 * - Aquí actualizarías el estado de la suscripción/compra en tu base de datos.
 * - Podrías notificar a otros microservicios/event bus.
 * - Se debe garantizar que la lógica sea **idempotente** (procesar varias veces no duplique efectos).
 */

import { Injectable, Logger } from '@nestjs/common';
import { PubSubPushDto } from '../dtos/pubsub-push.dto';
import { GooglePlayEventType } from '../domain/events';
import { GoogleRTDNMessage } from '../domain/models';

@Injectable()
export class RTDNService {
  private readonly logger = new Logger(RTDNService.name);

  async processNotification(push: PubSubPushDto): Promise<void> {
    // Stub async (para cumplir require-await)
    await Promise.resolve();

    // 1) Decodificar el campo data (base64 → string JSON)
    const data = Buffer.from(push.message.data, 'base64').toString('utf8');

    // 2) Parsear JSON de forma segura con tipado explícito
    const raw = JSON.parse(data) as unknown;
    const json = raw as GoogleRTDNMessage;

    // 3) Extraer notificaciones según el tipo
    const { subscriptionNotification, oneTimeProductNotification } = json;

    if (subscriptionNotification) {
      const event = this.mapSubscriptionEvent(
        subscriptionNotification.notificationType,
      );
      this.logger.log(`Subscription event: ${event}`);
      // TODO: persistir cambios en BD o notificar a otro servicio
    }

    if (oneTimeProductNotification) {
      const event = this.mapProductEvent(
        oneTimeProductNotification.notificationType,
      );
      this.logger.log(`In-app product event: ${event}`);
      // TODO: persistir cambios en BD o notificar a otro servicio
    }

    if (!subscriptionNotification && !oneTimeProductNotification) {
      this.logger.warn('RTDN payload sin notificación reconocida');
    }
  }

  /**
   * Convierte el código numérico de Google en un evento de negocio (suscripciones).
   */
  private mapSubscriptionEvent(notificationType: number): GooglePlayEventType {
    switch (notificationType) {
      case 1:
        return GooglePlayEventType.PURCHASED;
      case 2:
        return GooglePlayEventType.CANCELED;
      case 4:
        return GooglePlayEventType.RENEWED;
      default:
        return GooglePlayEventType.PURCHASED;
    }
  }

  /**
   * Convierte el código numérico de Google en un evento de negocio (compras in-app).
   */
  private mapProductEvent(notificationType: number): GooglePlayEventType {
    switch (notificationType) {
      case 1:
        return GooglePlayEventType.PURCHASED;
      case 2:
        return GooglePlayEventType.CANCELED;
      default:
        return GooglePlayEventType.PURCHASED;
    }
  }
}
