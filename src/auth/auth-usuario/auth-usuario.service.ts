import { gerarToken, verificarToken } from "../jwt/jwt";
import { AuthUsuarioRepositorio } from "./auth-usuario-repositorio";
import { LoginUsuarioDTO } from "./dto/LoginUsuario.dto";
import bcrypt from 'bcrypt'
import { VerificaOtp } from "./interfaces/auth-otp.interface";
import { ValidarOtpDados } from "./interfaces/validar-otp.interface";

export class AuthUsuarioService {
    constructor(
        private readonly authUsuarioRepositorio: AuthUsuarioRepositorio
    ) { }

    public async fazerLogin(loginUsuarioDTO: LoginUsuarioDTO) {
        try {

            let resposta;
            const usuario = await this.authUsuarioRepositorio.buscarUsuarioPorCpfLogin(loginUsuarioDTO);

            if (!usuario) {
                return {
                    erro: true,
                    status: 404,
                    mensagem: "Não encontramos em nossa base de dados nenhum usuário com esse CPF",
                };
            }

            const resultadoBcrypt = await bcrypt.compare(loginUsuarioDTO.senha, usuario.senha_hash);

            if (!resultadoBcrypt) {
                return {
                    erro: true,
                    status: 401,
                    mensagem: "Senha incorreta",
                };
            }

            const resultadoOtp = this.verificaOtpAtivo(loginUsuarioDTO);

            let payload = {}

            payload = {
                id: usuario.id_usuario,
                nome: usuario.nome,
                perfil: usuario.tipo_usuario
            }

            // Se o otp estiver ativo na conta, adicionamos no token que é necessário a validação do otp
            if ((await resultadoOtp).otpEstaAtivo) {
                this.gerarOtp(loginUsuarioDTO)
                Object.assign(payload, { otp_ativo: true })
            } else {
                Object.assign(payload, { otp_ativo: false })
            }

            const token = gerarToken(payload);
            resposta = token;

            return { token: resposta };
        } catch (erro) {
            return {
                erro: true,
                status: 500,
                mensagem: "Ocorreu um erro inesperado!",
            };
        }
    }

    public async validarOtp(validarOtpDados: ValidarOtpDados) {
        const resposta: any = await this.authUsuarioRepositorio.buscarUsuarioPorIdDadosOtp(validarOtpDados.id_usuario)

        if (!resposta.otp_codigo && !resposta.otp_expiracao) {
            return {
                erro: true,
                status: 500,
                mensagem: "Ocorreu um erro inesperado ao recuperar o codigo OTP ou a expiração no banco de dados!",
            };
        }

        if (!(validarOtpDados.otp_codigo === resposta.otp_codigo)) {
            return {
                erro: true,
                status: 401,
                mensagem: "O código informado não é igual ao enviado ao usuário!",
            };
        }

        if (new Date() > new Date(resposta.otp_expiracao)) {
            return {
                erro: true,
                status: 401,
                mensagem: "O código expirado!",
            };
        }

        // Se chegou até aqui é porque passou por todas as validações
        const payload = {
            id: resposta.id_usuario,
            cpf: resposta.cpf,
            nome: resposta.nome,
            tipo_usuario: resposta.tipo_usuario
        }


        const token = gerarToken(payload)

        return {token}
    }

    public async verificaOtpAtivo(loginUsuarioDTO: LoginUsuarioDTO): Promise<VerificaOtp> {
        const resultado = await this.authUsuarioRepositorio.verificaOtpAtivoUsuario(loginUsuarioDTO)
        return resultado
    }

    public async gerarOtp(loginUsuarioDTO: LoginUsuarioDTO): Promise<any> {
        const resultado = await this.authUsuarioRepositorio.gerarOtp(loginUsuarioDTO)
        return resultado
    }
}