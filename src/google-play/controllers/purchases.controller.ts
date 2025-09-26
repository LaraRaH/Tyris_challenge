/**
 * PurchasesController
 * --------------------
 * Propósito:
 * Este controlador expone el endpoint HTTP que usará la app móvil para
 * enviar al backend la información de una compra hecha en Google Play.
 *
 * Flujo:
 * - La app Android manda un POST a `/google-play/purchases/verify`
 *   con un cuerpo JSON (DTO) que incluye el packageName, productId,
 *   purchaseToken y purchaseType.
 * - El DTO se valida automáticamente (gracias a class-validator + ValidationPipe).
 * - El controlador delega la lógica al PurchasesService, que valida
 *   el token contra Google Play.
 * - Devuelve una respuesta JSON con el resultado de la verificación.
 */

import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ValidateReceiptDto } from '../dtos/validate-receipt.dto';
import { PurchasesService } from '../services/purchases.service';

@Controller('google-play/purchases')
// Este decorador indica que todas las rutas de este controlador
// empiezan con /google-play/purchases
export class PurchasesController {
  // Inyecta el servicio que contiene la lógica de negocio
  constructor(private readonly purchases: PurchasesService) {}

  @Post('verify')
  // Define un endpoint POST en /google-play/purchases/verify
  @HttpCode(200)
  // Fuerza a que devuelva siempre un HTTP 200 si el flujo es correcto
  async verify(@Body() dto: ValidateReceiptDto) {
    // dto: objeto validado automáticamente con class-validator
    // Contiene packageName, productId, purchaseToken y purchaseType

    // Llamamos al servicio para que haga la verificación con Google
    const result = await this.purchases.verifyReceipt(dto);

    // Respondemos con un objeto simple que indica:
    // - si el token es válido o no (valid)
    // - el estado (purchased, canceled, etc.)
    // - la respuesta cruda de Google para trazabilidad (raw)
    return { valid: result.valid, status: result.status, raw: result.raw };
  }
}
