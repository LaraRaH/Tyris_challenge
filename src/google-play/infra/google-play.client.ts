/**
 * GooglePlayClient
 * --------------------
 * Este archivo está pensado para implementar un cliente de infraestructura
 * que encapsule las llamadas reales a la Google Play Developer API.
 *
 * Ventajas:
 * - Mantener la lógica de comunicación con Google separada del dominio.
 * - Permitir testear los servicios (PurchasesService, RTDNService) con mocks.
 * - Centralizar la gestión de autenticación, errores, reintentos, etc.
 *
 * En una implementación real, aquí usaríamos la librería oficial `googleapis`
 * para crear un `androidpublisher` y exponer métodos como:
 * - verifyProductPurchase(...)
 * - verifySubscription(...)
 */
