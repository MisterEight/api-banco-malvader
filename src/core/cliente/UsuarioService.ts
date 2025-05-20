import { Usuario } from "./Usuario";
import { UsuarioRepositorio } from "./UsuarioRepositorio";
import { Erro } from "../../utils/interfaces/respostas";
import { CriarUsuarioDto } from "./dto/CriarUsuario.dto";

export class UsuarioService {

    constructor(
        private readonly usuarioRepositorio: UsuarioRepositorio
    ){}

    public async criarUsuario(usuario: CriarUsuarioDto): Promise<any[] | Erro>{

        try {
            const usuarioExiste: boolean = await this.usuarioRepositorio.verificaSeUsuarioExisteBoolean(usuario.cpf);

            if(!!usuarioExiste) {
                return {
                    
                    erro: new Error("Usuário com esse CPF já existe!").message,
                    mensagem: "Só é possível cadastrar usuário que nunca foram cadastrados ou tiveram a conta excluída."
                    
                }
            }
           
            const retornoInsert = await this.usuarioRepositorio.criar(new Usuario(usuario));


           if(retornoInsert?.insertId){
               const novoUsuario = await this.usuarioRepositorio.buscarUsuarioPorId(retornoInsert?.insertId)
               if(!!novoUsuario){
                    return novoUsuario;
               }
           }

           return {erro: 500, mensagem: 'Erro interno usuário cadastrado não encontrado'};
        } catch(erro){
            return {erro: erro, mensagem: 'ocorreu um erro inesperado!'}
        }
       

    }
}