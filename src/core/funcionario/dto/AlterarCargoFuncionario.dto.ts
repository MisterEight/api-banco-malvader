import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  isString,
  IsUUID,
  IsIn
} from 'class-validator';

export class AlterarCargoFuncionarioDto {

    @IsNotEmpty()
    @IsUUID()
    id_funcionario!: string

    @IsNotEmpty()
    @IsString()
    @IsIn(['comum', 'administrador'], { message: 'O cargo deve ser "comum" ou "administrador".' })
    cargo!: string;
}
