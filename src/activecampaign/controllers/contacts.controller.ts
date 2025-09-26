import { Controller, Get, Param, Post, Body, Query, HttpCode } from '@nestjs/common';
import { ContactsService } from '../services/contacts.service';
import { CreateContactDto } from '../dtos/create-contact.dto';

@Controller('activecampaign/contacts')
export class ContactsController {
  constructor(private readonly contacts: ContactsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateContactDto) {
    const contact = await this.contacts.create(dto);
    return { contact };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const contact = await this.contacts.getById(id);
    return { contact };
  }

  @Get()
  async getByEmail(@Query('email') email?: string) {
    if (!email) return { contact: null };
    const contact = await this.contacts.getByEmail(email);
    return { contact };
  }
}
