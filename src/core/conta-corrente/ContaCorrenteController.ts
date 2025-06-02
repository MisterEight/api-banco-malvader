import { pool } from "../../config/database";
import { ContaCorrenteRepositorio } from "./ContaCorrenteRepositorio";
import { ContaCorrenteService } from "./ContaCorrenteService";
import { CriarContaCorrenteDto } from "./dto/CriarContaCorrente";

export class ContaCorrenteController {
    private contaCorrenteService: ContaCorrenteService;

    constructor(){
        const contaCorrenteRepositorio: ContaCorrenteRepositorio = new ContaCorrenteRepositorio(pool)
        this.contaCorrenteService = new ContaCorrenteService(contaCorrenteRepositorio)
    }

    public async criarContaCorrente(criarContaCorrente: CriarContaCorrenteDto) {
        const resposta = await this.contaCorrenteService.criarContaCorrente(criarContaCorrente);
        return resposta;
    }
}