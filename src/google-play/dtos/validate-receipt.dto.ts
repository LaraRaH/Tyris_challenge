/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * ValidateReceiptDto
 * --------------------
 * Propósito:
 * Este DTO define la forma en que la app cliente (Android) debe enviar
 * los datos de una compra para que el backend los valide contra Google Play.
 *
 * Contexto:
 * - Después de comprar algo en la app, la Billing Library de Android
 *   entrega un `purchaseToken` al cliente.
 * - El cliente llama a tu backend con ese token, el id del producto
 *   y el packageName.
 * - Este DTO asegura que el cuerpo de la petición tenga los campos correctos
 *   y los valida con `class-validator`.
 */

import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class ValidateReceiptDto {
  @IsString()
  @IsNotEmpty()
  packageName!: string;
  // Nombre del paquete de la app (ej. com.empresa.app).
  // Necesario para validar con la API de Google Play.

  @IsString()
  @IsNotEmpty()
  productId!: string;
  // Identificador del producto o suscripción (SKU).
  // Lo defines en Play Console (ej. premium_monthly).

  @IsString()
  @IsNotEmpty()
  purchaseToken!: string;
  // Token único que genera Google Play al completar una compra.
  // Es la “prueba” de que la compra ocurrió.

  @IsIn(['inapp', 'subscription'])
  purchaseType!: 'inapp' | 'subscription';
  // Tipo de compra: in-app (única) o suscripción (recurrente).
  // Restringido con @IsIn para evitar valores inválidos.
}
