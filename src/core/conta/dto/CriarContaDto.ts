import { IsString, IsNumber, IsBoolean, IsDateString, IsUUID, IsEnum } from 'class-validator';
import { TipoConta } from '../interfaces/interfaces';

export class CriarContaDTO {
  @IsUUID()
  id_agencia!: string;

  @IsNumber()
  saldo!: number;

  @IsEnum(TipoConta, {message: "Tipo conta deve ser 'CORRENTE', 'POUPANCA' ou 'INVESTIMENTO'"})
  tipo_conta!: TipoConta

  @IsUUID()
  id_cliente!: string;

  @IsDateString()
  data_abertura!: string;

  @IsNumber()
  status!: number;
}
