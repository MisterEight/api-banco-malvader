import { IsString, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginUsuarioDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(11, {message: "O CPF deve ter no máximo 11 caracteres"})
    @MinLength(11, {message: 'O CPF deve ter no minimo 11 caractreres'})
    cpf!: string

    @IsString()
    senha!: string
}