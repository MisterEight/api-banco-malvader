import { pool } from "../../config/database";
import { CriarFuncionarioDto } from "./dto/CriarFuncionario.dto";
import { FuncionarioRepositorio } from "./FuncionarioRepositorio";
import { FuncionarioService } from "./FuncionarioService";

export class FuncionarioController {
    private funcionarioService: FuncionarioService;

    constructor(){
        const funcionarioRepositorio = new FuncionarioRepositorio(pool)
        this.funcionarioService = new FuncionarioService(funcionarioRepositorio)
    }

    public async criarFuncionario(criarFuncionario: CriarFuncionarioDto){
        const resposta = await this.funcionarioService.criarFuncionario(criarFuncionario);
        return resposta;
    }
}