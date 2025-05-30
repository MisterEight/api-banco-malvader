import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
  Length
} from 'class-validator';

export class CriarUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'CPF deve ter exatamente 11 dígitos' })
  cpf!: string;

  @IsDateString({}, { message: 'data_nascimento deve ser uma data válida (YYYY-MM-DD)' })
  @IsNotEmpty()
  data_nascimento!: string;

  @IsString()
  @IsOptional()
  tipo_usuario?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  senha_hash!: string;

  @IsBoolean()
  @IsOptional()
  otp_ativo?: boolean;
}
