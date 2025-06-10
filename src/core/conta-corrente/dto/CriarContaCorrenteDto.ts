import { IsUUID, IsNumber, IsDateString, IsPositive, IsOptional } from 'class-validator';

export class CriarContaCorrenteDto {
  @IsUUID()
  id_conta!: string;

  @IsNumber()
  @IsPositive()
  limite!: number;

  @IsDateString()
  data_vencimento!: string;

  @IsNumber()
  @IsPositive()
  taxa_manutencao!: number;
}
