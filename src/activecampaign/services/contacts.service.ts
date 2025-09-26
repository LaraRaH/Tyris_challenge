import { Injectable } from '@nestjs/common';
import { ActiveCampaignClient } from '../infra/activecampaign.client';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { ACContact } from '../domain/models';

@Injectable()
export class ContactsService {
  constructor(private readonly ac: ActiveCampaignClient) {}

  async create(dto: CreateContactDto): Promise<ACContact> {
    // Aquí podrías normalizar nombres, validar duplicados, etc.
    return this.ac.createContact({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
  }

  async getById(id: string): Promise<ACContact> {
    return this.ac.getContactById(id);
  }

  async getByEmail(email: string): Promise<ACContact | null> {
    return this.ac.getContactByEmail(email);
  }
}
