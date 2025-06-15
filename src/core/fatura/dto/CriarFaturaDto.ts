import { IsUUID, IsDateString, IsNumber, IsOptional, IsPositive, IsIn } from 'class-validator';

export class CriarFaturaDto {
  @IsUUID()
  id_conta_corrente!: string;

  @IsDateString()
  competencia!: string;

  @IsDateString()
  data_vencimento!: string; 

  @IsNumber()
  @IsPositive()
  valor!: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  valor_pagamento?: number;

  @IsOptional()
  @IsIn([
    'aberta',
    'paga_em_dia',
    'pagamento_parcial',
    'atraso_1_mes',
    'atraso_2_meses',
    'atraso_3_meses',
    'atraso_4_meses',
    'atraso_5_meses',
    'atraso_6_meses',
    'atraso_7_meses',
    'atraso_8_meses',
    'atraso_9m_ou_mais'
  ])
  status?: string;
}
