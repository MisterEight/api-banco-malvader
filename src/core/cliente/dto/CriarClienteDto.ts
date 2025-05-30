import { IsNumber, IsUUID } from "class-validator";

export class CriarClienteDto {
    @IsUUID()
    id_usuario!: string;
}