import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CriarAuditoriaDto {
    @IsUUID()
    id_usuario!: string;

    @IsString()
    @IsNotEmpty()
    acao!: string;

    @IsString()
    detalhes!: string;
}
