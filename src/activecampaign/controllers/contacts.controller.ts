/**
 * ContactsController
 * --------------------
 * Propósito:
 * Este controlador expone los endpoints HTTP que permiten a clientes
 * (por ejemplo, tu panel de administración o tu app) interactuar con
 * la API de ActiveCampaign a través de tu backend.
 *
 * Flujo:
 * - POST /activecampaign/contacts → crear un contacto en ActiveCampaign.
 * - GET  /activecampaign/contacts/:id → consultar un contacto por su ID.
 * - GET  /activecampaign/contacts?email=foo@bar.com → consultar un contacto por email.
 *
 * Contexto:
 * - El controlador no contiene lógica de negocio, solo recibe las peticiones
 *   y delega el trabajo en el ContactsService.
 * - Usa DTOs (como CreateContactDto) para validar automáticamente
 *   los datos de entrada.
 */

import { Controller, Get, Param, Post, Body, Query, HttpCode } from '@nestjs/common';
import { ContactsService } from '../services/contacts.service';
import { CreateContactDto } from '../dtos/create-contact.dto';

@Controller('activecampaign/contacts')
// Todas las rutas de este controlador empiezan con /activecampaign/contacts
export class ContactsController {
  // Inyectamos el servicio que contiene la lógica de negocio
  constructor(private readonly contacts: ContactsService) {}

  @Post()
  @HttpCode(201) // código 201 = recurso creado
  async create(@Body() dto: CreateContactDto) {
    // dto validado automáticamente con class-validator
    // Contiene email, firstName, lastName, etc.
    const contact = await this.contacts.create(dto);
    // Devolvemos el contacto creado (tal como nos lo mapeó el servicio)
    return { contact };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    // Obtenemos un contacto por su ID en ActiveCampaign
    const contact = await this.contacts.getById(id);
    return { contact };
  }

  @Get()
  async getByEmail(@Query('email') email?: string) {
    // Si no llega query param email, devolvemos null
    if (!email) return { contact: null };
    // Si llega, pedimos al servicio que lo busque
    const contact = await this.contacts.getByEmail(email);
    return { contact };
  }
}
