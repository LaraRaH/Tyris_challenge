/**
 * models.ts
 * --------------------
 * Propósito:
 * Este archivo define los **tipos e interfaces de dominio** que usamos para:
 * - Representar los estados de una compra/suscripción.
 * - Describir cómo luce la respuesta de Google Play en distintos endpoints.
 * - Tipar las notificaciones RTDN (Real-Time Developer Notifications).
 *
 * Ventaja:
 * Centralizar estos modelos evita usar `any` y hace el código más legible,
 * seguro y auto-documentado.
 */

// -------------------------------
// Estados de negocio internos
// -------------------------------
export type PurchaseStatus =
  | 'PURCHASED' // compra realizada (o suscripción activa)
  | 'ACTIVE' // suscripción activa (estado típico de subs v2)
  | 'CANCELED' // cancelada por el usuario o Google
  | 'PENDING' // compra en proceso (no confirmada)
  | 'UNKNOWN'; // no se pudo mapear a un estado claro

// -------------------------------
// Respuesta de la API de Google para productos in-app
// -------------------------------
export interface GoogleProductPurchase {
  /**
   * purchaseState:
   * 0 = purchased
   * 1 = canceled
   * 2 = pending
   */
  purchaseState?: 0 | 1 | 2;

  /**
   * acknowledgementState:
   * 0 = no reconocido
   * 1 = reconocido
   * (importante: Google exige que reconozcas compras para considerarlas válidas)
   */
  acknowledgementState?: 0 | 1;
}

// -------------------------------
// Respuesta de la API de Google para suscripciones (versión 2, más moderna)
// -------------------------------
export interface GoogleSubscriptionPurchaseV2 {
  /**
   * subscriptionState: el valor numérico depende de la doc de Google
   * Ejemplo: 0 = UNKNOWN, 1 = ACTIVE, 2 = PAUSED, 3 = IN_GRACE_PERIOD, etc.
   */
  subscriptionState?: number;

  /** Indica si la suscripción está reconocida por el servidor */
  acknowledged?: boolean;
}

// -------------------------------
// Estructura del mensaje RTDN (Real-Time Developer Notification)
// que Google envía vía Pub/Sub.
// -------------------------------
export interface GoogleRTDNMessage {
  subscriptionNotification?: {
    /** Código numérico que indica el tipo de evento (compra, cancelación, etc.) */
    notificationType: number;
    purchaseToken?: string;
    subscriptionId?: string; // SKU de la suscripción
  };
  oneTimeProductNotification?: {
    notificationType: number;
    purchaseToken?: string;
    sku?: string; // SKU del producto in-app
  };
}
