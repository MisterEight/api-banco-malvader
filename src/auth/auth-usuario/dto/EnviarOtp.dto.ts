import { IsString, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class ValidarDtpDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(6, {message: "O OTP deve ter no máximo 6 caracteres"})
    @MinLength(6, {message: 'O OTP deve ter no minimo 6 caractreres'})
    otp_codigo!: string;
}