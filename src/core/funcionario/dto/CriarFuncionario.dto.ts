import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
  Length,
  IsNumber,
  isString,
  IsUUID,
  IsIn
} from 'class-validator';

export class CriarFuncionarioDto {
  
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsIn(['comum', 'administrador'], { message: 'O cargo deve ser "comum" ou "administrador".' })
  cargo!: string;

  @IsNumber()
  @IsOptional()
  id_supervisor?: number | null;

  @IsUUID()
  id_usuario!: string

}
