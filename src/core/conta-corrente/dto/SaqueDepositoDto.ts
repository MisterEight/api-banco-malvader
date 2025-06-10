import { IsUUID, IsNumber, IsDateString, IsPositive, IsOptional, IsNotEmpty } from 'class-validator';

export class SaqueDepositoDto {
  @IsUUID()
  @IsNotEmpty()
  id_conta_corrente!: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  valor!: number;
}
