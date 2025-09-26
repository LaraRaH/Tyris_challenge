/**
 * Enumeracion de los eventos principales que Google Play puede notificar
 * y que el backend entiende como estados de negocio.
 */
export enum GooglePlayEventType {
  PURCHASED = 'PURCHASED',
  RENEWED = 'RENEWED',
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
}
