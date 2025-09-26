/**
 * PubSubPushDto
 * --------------------
 * DTO del push HTTP de Google Pub/Sub (RTDN).
 * Nest asignará estas propiedades al deserializar el body,
 * por eso usamos `!` (definite assignment).
 */

export interface PubSubMessage {
  /** ID único del mensaje dentro de Pub/Sub */
  messageId: string;

  /** Momento en que se publicó el mensaje */
  publishTime: string;

  /**
   * Contenido del mensaje en base64
   * → Debes decodificarlo a JSON para obtener el RTDN real.
   */
  data: string;

  /**
   * Atributos opcionales que Pub/Sub puede adjuntar.
   * Son pares clave-valor, poco usados en RTDN.
   */
  attributes?: Record<string, string>;
}

export class PubSubPushDto {
  /** Mensaje Pub/Sub con el payload en base64 */
  message!: PubSubMessage;

  /**
   * Nombre completo de la suscripción Pub/Sub
   * Ejemplo: projects/my-project/subscriptions/my-subscription
   */
  subscription!: string;
}
