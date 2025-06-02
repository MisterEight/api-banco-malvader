import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CriarEnderecoAgenciaDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id_agencia!: string;

  @IsString()
  @IsNotEmpty()
  cep!: string;

  @IsString()
  @IsNotEmpty()
  local!: string;

  @IsNumber()
  numero_casa!: number;

  @IsString()
  @IsNotEmpty()
  bairro!: string;

  @IsString()
  @IsNotEmpty()
  cidade!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;

  @IsString()
  complemento!: string;
}
