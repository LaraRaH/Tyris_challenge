/**
 * ContactsService
 * ----------------
 * Propósito:
 * Este servicio contiene la lógica de negocio relacionada con contactos
 * en ActiveCampaign.
 *
 * Contexto:
 * - El controlador recibe las peticiones HTTP (crear, obtener por id/email).
 * - Este servicio actúa como intermediario entre el controlador y
 *   el cliente HTTP (`ActiveCampaignClient`).
 * - Aquí podrías añadir reglas de negocio propias (validaciones,
 *   normalización de nombres, comprobación de duplicados…).
 *
 * Flujo:
 * - `create`: recibe un DTO validado y llama al cliente para crear el contacto.
 * - `getById`: delega en el cliente para obtener un contacto por ID.
 * - `getByEmail`: delega en el cliente para obtener un contacto por email.
 */

import { Injectable } from '@nestjs/common';
import { ActiveCampaignClient } from '../infra/activecampaign.client';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { ACContact } from '../domain/models';

@Injectable()
export class ContactsService {
  // Inyectamos el cliente de ActiveCampaign para hacer llamadas externas
  constructor(private readonly ac: ActiveCampaignClient) {}

  /**
   * Crear un nuevo contacto.
   * - Aquí podrías aplicar lógica extra (ej: normalizar mayúsculas/minúsculas en el email).
   */

  async create(dto: CreateContactDto): Promise<ACContact> {
    return this.ac.createContact({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
  }

  //Obtener un contacto por su ID
  async getById(id: string): Promise<ACContact> {
    return this.ac.getContactById(id);
  }

  /**
   * Buscar un contacto por email.
   * Devuelve null si no existe.
   */

  async getByEmail(email: string): Promise<ACContact | null> {
    return this.ac.getContactByEmail(email);
  }
}
