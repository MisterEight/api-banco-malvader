import { AlterarCargoFuncionarioDto } from "./dto/AlterarCargoFuncionario.dto";
import { CriarFuncionarioDto } from "./dto/CriarFuncionario.dto";
import { Funcionario } from "./Funcionario";
import { FuncionarioRepositorio } from "./FuncionarioRepositorio";

export class FuncionarioService {

    constructor(private readonly funcionarioRepositorio: FuncionarioRepositorio){}

    public async criarFuncionario(criarFuncionarioDto: CriarFuncionarioDto): Promise<any> {

        const funcionario = new Funcionario(
            criarFuncionarioDto.nome,
            criarFuncionarioDto.cargo,
            criarFuncionarioDto.id_supervisor ? criarFuncionarioDto.id_supervisor : null,
            criarFuncionarioDto.id_usuario
        )

        try {
            const resultado = await this.funcionarioRepositorio.inserirFuncionario(funcionario);
            return resultado;      
        } catch (erro){
             return {
                erro: true,
                mensagem: erro instanceof Error ? erro.message : String(erro),
                codigo: 500
            }
        }
     
    }

    public async alterarCargo(alterarCargoFuncionarioDto: AlterarCargoFuncionarioDto): Promise<any> {
        try {
            const resultado = await this.funcionarioRepositorio.alterarCargo(alterarCargoFuncionarioDto)
            return resultado;
        } catch (erro){
            return {
                erro: true,
                mensagem: erro instanceof Error ? erro.message : String(erro),
                codigo: 500
            }
        }
    }

}