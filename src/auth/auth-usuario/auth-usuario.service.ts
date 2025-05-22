import { gerarToken, verificarToken } from "../jwt/jwt";
import { AuthUsuarioRepositorio } from "./auth-usuario-repositorio";
import { LoginUsuarioDTO } from "./dto/LoginUsuario.dto";
import bcrypt from 'bcrypt'

export class AuthUsuarioService {
    constructor(
        private readonly authUsuarioRepositorio: AuthUsuarioRepositorio
    ) { }

    public async fazerLogin(loginUsuarioDTO: LoginUsuarioDTO) {
        try {
            const usuario = await this.authUsuarioRepositorio.buscarUsuarioPorCpfLogin(loginUsuarioDTO);

            if (!usuario) {
                return {
                    erro: true,
                    status: 404,
                    mensagem: "Não encontramos em nossa base de dados nenhum usuário com esse CPF",
                };
            }

           const resultadoBcrypt = await bcrypt.compare(loginUsuarioDTO.senha, usuario.senha_hash)

           if(!resultadoBcrypt){
                  return {
                    erro: true,
                    status: 401,
                    mensagem: "Senha incorreta",
                };
           }

           const payload = {
                id: usuario.id_usuario,
                nome: usuario.nome,
                perfil: usuario.tipo_usuario
           }

           const token = gerarToken(payload)

           return {token} ;
        } catch (erro) {
            return {
                erro: true,
                status: 500,
                mensagem: "Ocorreu um erro inesperado!",
            };
        }
    }
}