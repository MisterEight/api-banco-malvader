import { pool } from "../../config/database";
import { AuthUsuarioRepositorio } from "./auth-usuario-repositorio";
import { LoginUsuarioDTO } from "./dto/LoginUsuario.dto";
import { AuthUsuarioService } from "./auth-usuario.service";
import { ValidarOtpDados } from "./interfaces/validar-otp.interface";


export class AuthUsuarioController {

    private authUsuarioService: AuthUsuarioService;
    constructor() {
        const authUsuarioRepositorio = new AuthUsuarioRepositorio(pool)
        this.authUsuarioService = new AuthUsuarioService(authUsuarioRepositorio)
    }

    // Controller para fazer login do usuarios
    public async loginUsuario(loginUsuarioDTO: LoginUsuarioDTO) {
        // esparamos o token, ou o erro rsrs
        const resposta: any = await this.authUsuarioService.fazerLogin(loginUsuarioDTO)
        return resposta;
    }

    public async validarOtp(validarOtpDados: ValidarOtpDados){
        const resposta: any = await this.authUsuarioService.validarOtp(validarOtpDados);
        return resposta;
    }


}

