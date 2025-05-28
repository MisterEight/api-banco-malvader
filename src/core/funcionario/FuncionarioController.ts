import { pool } from "../../config/database";
import { AlterarCargoFuncionarioDto } from "./dto/AlterarCargoFuncionario.dto";
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
        try {
            const resposta = await this.funcionarioService.criarFuncionario(criarFuncionario);
            return resposta;
        } catch(erro) {
            return {
                erro: true,
                mensagem: erro instanceof Error ? erro.message : String(erro),
                codigo: 500
            }
        } 
    }

    public async alterarCargoFuncionario(alterarCargoFuncionarioDto: AlterarCargoFuncionarioDto){
        try {
            const resposta = await this.funcionarioService.alterarCargo(alterarCargoFuncionarioDto);
            return resposta;
        } catch(erro) {
            return {
                erro: true,
                mensagem: erro instanceof Error ? erro.message : String(erro),
                codigo: 500
            }
        } 
    }
}