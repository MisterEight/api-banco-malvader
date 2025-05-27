import { CriarFuncionarioDto } from "./dto/CriarFuncionario.dto";
import { Funcionario } from "./Funcionario";
import { FuncionarioRepositorio } from "./FuncionarioRepositorio";

export class FuncionarioService {

    constructor(private readonly funcionarioRepositorio: FuncionarioRepositorio){}

    public async criarFuncionario(criarFuncionarioDto: CriarFuncionarioDto): Promise<any> {
        const funcionario = new Funcionario(
            criarFuncionarioDto.nome,
            criarFuncionarioDto.cargo,
            criarFuncionarioDto.id_supervisor ? criarFuncionarioDto.id_supervisor : null
        )

        const resultado = await this.funcionarioRepositorio.criarFuncionario(funcionario);
        return resultado;
    }
}