import { IsUUID, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { TipoConta } from '../interfaces/interfaces';

export class AtualizarContaDto {
  @IsUUID()
  id_conta!: string;

  @IsUUID()
  id_agencia!: string;

  @IsNumber()
  saldo!: number;

  @IsEnum(TipoConta, {message: "Tipo conta deve ser 'CORRENTE', 'POUPANCA' ou 'INVESTIMENTO'"})
  tipo_conta!: TipoConta;

  @IsUUID()
  id_cliente!: string;

  @IsDateString()
  data_abertura!: string;

  @IsNumber()
  status!: number;
}
