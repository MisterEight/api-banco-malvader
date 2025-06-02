import { pool } from "../../config/database";
import { ContaInvestimentoRepositorio } from "./ContaInvestimentoRepositorio";
import { ContaInvestimentoService } from "./ContaInvestimentoService";
import { CriarContaInvestimentoDto } from "./dto/CriarContaInvestimento";

export class ContaInvestimentoController {
    private contaInvestimentoService: ContaInvestimentoService;
    constructor(){
        const contaInvestimentoRepositorio: ContaInvestimentoRepositorio = new ContaInvestimentoRepositorio(pool);
        this.contaInvestimentoService = new ContaInvestimentoService(contaInvestimentoRepositorio)
    }

    public async criarContaInvestimento(criarContaInvestimentoDto: CriarContaInvestimentoDto){
        const resposta = await this.contaInvestimentoService.criarContaInvestimento(criarContaInvestimentoDto)
        return resposta;
    }
}