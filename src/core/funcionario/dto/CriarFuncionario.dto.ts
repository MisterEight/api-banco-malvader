import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
  Length,
  IsNumber
} from 'class-validator';

export class CriarFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  cargo!: string;

  @IsNumber()
  @IsOptional()
  id_supervisor?: number | null;
}
