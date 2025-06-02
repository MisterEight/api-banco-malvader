import { IsUUID, IsNumber, IsPositive } from 'class-validator';

export class CriarContaPoupancaDto {
  @IsUUID()
  id_conta!: string;

  @IsNumber()
  @IsPositive()
  taxa_rendimento!: number;

  @IsNumber()
  @IsPositive()
  ultimo_rendimento!: number;
}
