import { IsUUID, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { TipoPerfilRisco } from '../interfaces/interfaces';

export class CriarContaInvestimentoDto {

  @IsUUID()
  id_conta!: string;

  @IsEnum(TipoPerfilRisco, {message: "Deve ser do tipo 'CONSERVADOR', 'MODERADO' ou 'ARROJADO'"})
  perfil_risco!: TipoPerfilRisco;

  @IsNumber()
  @IsPositive()
  valor_minimo!: number;

  @IsNumber()
  @IsPositive()
  taxa_rendimento_base!: number;

}
