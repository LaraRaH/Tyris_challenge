import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
