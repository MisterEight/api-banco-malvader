import { IsUUID, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsDateString } from 'class-validator';
import { TipoTransacao } from '../interfaces/insterfaces';

export class CriarTransacaoDTO {
  @IsUUID()
  @IsNotEmpty()
  id_conta_origem!: string;

  @IsUUID()
  @IsNotEmpty()
  id_conta_destino!: string;

  @IsEnum(TipoTransacao)
  tipo_transacao!: TipoTransacao;

  @IsNumber()
  @IsPositive()
  valor!: number;

  @IsDateString()
  data_hora!: string;

  @IsString()
  descricao!: string;
}
