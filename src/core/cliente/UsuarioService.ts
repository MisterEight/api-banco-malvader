import { Usuario } from "./Usuario";
import { UsuarioRepositorio } from "./UsuarioRepositorio";
import { Erro } from "../../utils/interfaces/respostas";
import { CriarUsuarioDto } from "./dto/CriarUsuario.dto";
import { BuscarUsuarioCpf } from "./dto/BuscaPorCpf.dto";

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

    public async buscarUsuarioCpf(params: BuscarUsuarioCpf): Promise<any| Erro>{
        try {
            const usuario = await this.usuarioRepositorio.buscarUsuarioPorCpf(params)

            console.log(usuario)
            if(!usuario){
                return {
                    erro: new Error('Não existe um usuário com esse CPF'),
                    mensagem: "Não encontramos em nossa base de dados nenhum usuário com esse CPF"
                }
            }

            return usuario;
        } catch(erro){
            return {erro: 500, mensagem: "Ocorreu um erro inesperado!"}
        }
        
    }
}