import { IsUUID, IsNumber, IsPositive, Min, Max, IsInt } from 'class-validator';

export class CriarEmprestimoDto {
  
  @IsUUID()
  id_conta!: string;

  @IsNumber()
  @IsPositive({ message: 'O valor solicitado deve ser positivo.' })
  valor_solicitado!: number;

  @IsNumber()
  @Min(0.1, { message: 'A taxa de juros deve ser maior que zero.' })
  @Max(100, { message: 'A taxa de juros não pode ultrapassar 100% ao mês.' })
  taxa_juros_mensal!: number;

  @IsInt()
  @Min(1, { message: 'O prazo mínimo é de 1 mês.' })
  @Max(120, { message: 'O prazo máximo é de 120 meses.' })
  prazo_meses!: number;
}
