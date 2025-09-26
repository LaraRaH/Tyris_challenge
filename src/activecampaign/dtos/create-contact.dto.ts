/**
 * CreateContactDto
 * -----------------
 * Propósito:
 * Este DTO define la forma en que el cliente debe enviar los datos
 * al crear un contacto en ActiveCampaign a través de nuestro backend.
 *
 * Contexto:
 * - NestJS convierte automáticamente el body JSON en una instancia de esta clase.
 * - Usamos class-validator para validar cada propiedad.
 * - Esto asegura que no lleguen datos inválidos a la lógica de negocio.
 *
 * Flujo:
 * 1) El cliente hace POST a /activecampaign/contacts con un JSON.
 * 2) Nest aplica las validaciones:
 *    - email debe ser un email válido y obligatorio.
 *    - firstName y lastName son opcionales, pero si llegan deben ser strings.
 * 3) Si todo pasa, el controlador delega al ContactsService.
 */

import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsEmail() // valida que el valor sea un email válido
  email!: string;

  @IsString() // debe ser un string si llega
  @IsOptional() // no es obligatorio
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
