/**
 * models.ts (ActiveCampaign Domain Models)
 * -----------------------------------------
 * Propósito:
 * Definir los tipos/contratos de datos que usaremos dentro del dominio
 * de nuestra integración con ActiveCampaign.
 *
 * Contexto:
 * - Mantener estos modelos en una carpeta `domain/` permite separar
 *   el "lenguaje de negocio" (qué es un Contacto para nosotros)
 *   de la implementación técnica (axios, controladores, etc.).
 * - Así, si la API de ActiveCampaign cambia, solo se adapta este archivo
 *   y el resto de la app sigue usando los mismos tipos.
 */

export interface ACContact {
  id: string; // Identificador único del contacto en ActiveCampaign
  email: string; // Email principal del contacto
  firstName?: string; // Nombre (opcional)
  lastName?: string; // Apellido (opcional)
  // extensible: aquí se pueden añadir phone, tags, custom fields, etc.
}

export interface ACErrorPayload {
  message: string; // Mensaje de error legible
  status?: number; // Código HTTP o interno opcional
  details?: unknown; // Información extra del error (stack, respuesta de la API…)
}
