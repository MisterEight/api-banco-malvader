import { Usuario } from "./Usuario";
import { UsuarioRepositorio } from "./UsuarioRepositorio";
import { Erro } from "../../utils/interfaces/respostas";
import { CriarUsuarioDto } from "./dto/CriarUsuario.dto";
import { BuscarUsuarioCpf } from "./dto/BuscaPorCpf.dto";
import { FuncionarioRepositorio } from "../funcionario/FuncionarioRepositorio";
import { ClienteRepositorio } from "../cliente/ClienteRepositorio";
import { FuncionarioService } from "../funcionario/FuncionarioService";
import { ClienteService } from "../cliente/ClienteService";
import { CriarFuncionarioDto } from "../funcionario/dto/CriarFuncionario.dto";
import { CriarClienteDto } from "../cliente/dto/CriarClienteDto";

export class UsuarioService {
  private funcionarioService: FuncionarioService;
  private clienteService: ClienteService;
  constructor(
    private readonly usuarioRepositorio: UsuarioRepositorio,
    private readonly funcionarioRepositorio: FuncionarioRepositorio,
    private readonly clienteRepositorio: ClienteRepositorio
  ) {
    this.funcionarioService = new FuncionarioService(this.funcionarioRepositorio)
    this.clienteService = new ClienteService(this.clienteRepositorio)
  }

  public async criarUsuario(usuarioDto: CriarUsuarioDto): Promise<any | Erro> {
    try {
      const usuarioExiste = await this.usuarioRepositorio.verificaSeUsuarioExisteBoolean(usuarioDto.cpf);

      if (usuarioExiste) {
        return {
          erro: new Error("Usuário com esse CPF já existe!").message,
          mensagem: "Só é possível cadastrar usuários que nunca foram cadastrados ou que tiveram a conta excluída."
        };
      }

      const usuario = new Usuario(usuarioDto);
      usuario.setSenha(usuarioDto.senha_hash);
      usuario.gerarOtp();

      const retornoInsert = await this.usuarioRepositorio.criar(usuario);

      // Crio uma conta de funcionario se for do tipo o administrador
      if(usuarioDto.tipo_usuario == 'administrador'){
        const criarFuncionarioDto: CriarFuncionarioDto = {
          nome: usuarioDto.nome,
          cargo: 'comum',
          id_usuario: retornoInsert?.insertId
        }
        const novoFuncionario = await this.funcionarioService.criarFuncionario(criarFuncionarioDto);
      } else if (usuarioDto.tipo_usuario == 'comum'){
        const criarClienteDto: CriarClienteDto = {
          id_usuario: retornoInsert?.insertId
        }
      }

      if (retornoInsert?.insertId) {
        const novoUsuario = await this.usuarioRepositorio.buscarUsuarioPorId(retornoInsert?.insertId);
        return novoUsuario;
      }

      return { erro: 500, mensagem: 'Erro interno: usuário cadastrado não encontrado' };
    } catch (erro) {
      return { erro: erro, mensagem: 'Ocorreu um erro inesperado!' };
    }
  }

  public async buscarUsuarioCpf(params: BuscarUsuarioCpf): Promise<any | Erro> {
    try {
      const usuario = await this.usuarioRepositorio.buscarUsuarioPorCpf(params);
      if (!usuario) {
        return {
          erro: new Error('Não existe um usuário com esse CPF'),
          mensagem: "Não encontramos em nossa base de dados nenhum usuário com esse CPF"
        };
      }
      return usuario;
    } catch (erro) {
      return { erro: 500, mensagem: "Ocorreu um erro inesperado!" };
    }
  }
}
