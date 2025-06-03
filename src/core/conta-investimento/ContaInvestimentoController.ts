import { pool } from "../../config/database";
import { ContaRepositorio } from "../conta/ContaRepositorio";
import { ContaInvestimentoRepositorio } from "./ContaInvestimentoRepositorio";
import { ContaInvestimentoService } from "./ContaInvestimentoService";
import { CriarContaInvestimentoDto } from "./dto/CriarContaInvestimento";

export class ContaInvestimentoController {
    private contaInvestimentoService: ContaInvestimentoService;
    constructor(){
        const contaInvestimentoRepositorio: ContaInvestimentoRepositorio = new ContaInvestimentoRepositorio(pool);
        const contaRepositorio: ContaRepositorio = new ContaRepositorio(pool)
        this.contaInvestimentoService = new ContaInvestimentoService(contaInvestimentoRepositorio, contaRepositorio)
    }

    public async criarContaInvestimento(criarContaInvestimentoDto: CriarContaInvestimentoDto){
        const resposta = await this.contaInvestimentoService.criarContaInvestimento(criarContaInvestimentoDto)
        return resposta;
    }
}