import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CriarAgenciaDto {

    @IsNotEmpty()
    @IsString()
    nome!: string;
}