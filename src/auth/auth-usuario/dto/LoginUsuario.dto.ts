import { IsString, IsNotEmpty, MaxLength, MinLength, IsEnum } from "class-validator";

export enum TipoUsuario {
    cliente = 'cliente',
    funcionario = 'funcionario'
}


export class LoginUsuarioDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(11, {message: "O CPF deve ter no máximo 11 caracteres"})
    @MinLength(11, {message: 'O CPF deve ter no minimo 11 caractreres'})
    cpf!: string

    @IsString()
    senha!: string

    // Cliente ou funcionário?
    @IsNotEmpty()
    @IsEnum(TipoUsuario, {message: ' Selecione cliente ou funcionario'})
    tipo!: string
}