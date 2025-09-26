/**
 * RTDNController
 * --------------------
 * Propósito:
 * Este controlador expone el endpoint HTTP que recibe las notificaciones
 * en tiempo real de Google Play (RTDN = Real-Time Developer Notifications).
 *
 * Flujo:
 * - Google Play, a través de Pub/Sub, envía un POST a /google-play/rtdn.
 * - El mensaje incluye un payload base64 con información sobre el evento
 *   (compra nueva, renovación, cancelación, etc.).
 * - El controlador:
 *   1) (Opcional) verifica que el push sea auténtico (firma/JWT).
 *   2) Pasa el payload al servicio RTDNService para procesar el evento.
 * - Responde con HTTP 204 (sin contenido) porque Google solo necesita
 *   confirmación de recepción rápida.
 */

import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { PubSubPushDto } from '../dtos/pubsub-push.dto';
import { RTDNService } from '../services/rtdn.service';
import { SignatureVerifierService } from '../services/signature-verifier.service';

@Controller('google-play/rtdn')
// Todas las rutas de este controlador empiezan con /google-play/rtdn
export class RTDNController {
  constructor(
    private readonly rtdn: RTDNService, // servicio que contiene la lógica para procesar notificaciones
    private readonly sig: SignatureVerifierService, // servicio para verificar la autenticidad del push
  ) {}

  @Post()
  // El endpoint es POST /google-play/rtdn
  @HttpCode(204)
  // Devuelve 204 No Content (lo que Google espera para no reintentar)
  async handlePush(@Body() body: PubSubPushDto, @Headers() headers: any) {
    // body: objeto validado que representa el mensaje Pub/Sub (con data en base64)
    // headers: cabeceras HTTP, usadas para verificar autenticidad

    // 1) Verificar la autenticidad del push (opcional)
    // Aquí podrías comprobar un JWT o un token de Google.
    await this.sig.verify(headers);

    // 2) Pasar el payload al servicio que sabe interpretar y procesar eventos
    await this.rtdn.processNotification(body);

    // 3) No devolvemos nada (solo el 204). Google solo necesita "OK".
    return;
  }
}
