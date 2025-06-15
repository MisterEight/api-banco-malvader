import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CriarRelatorioDto {
    @IsUUID()
    id_funcionario!: string;

    @IsString()
    @IsNotEmpty()
    tipo_relatorio!: string;

    @IsString()
    @IsNotEmpty()
    conteudo!: string;
}
