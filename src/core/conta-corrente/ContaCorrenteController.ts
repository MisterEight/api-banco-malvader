import { pool } from "../../config/database";
import { ContaRepositorio } from "../conta/ContaRepositorio";
import { ContaCorrenteRepositorio } from "./ContaCorrenteRepositorio";
import { ContaCorrenteService } from "./ContaCorrenteService";
import { CriarContaCorrenteDto } from "./dto/CriarContaCorrente";

export class ContaCorrenteController {
    private contaCorrenteService: ContaCorrenteService;

    constructor(){
        const contaCorrenteRepositorio: ContaCorrenteRepositorio = new ContaCorrenteRepositorio(pool)
        const contaRepositorio: ContaRepositorio = new ContaRepositorio(pool)
        this.contaCorrenteService = new ContaCorrenteService(contaCorrenteRepositorio, contaRepositorio)
    }

    public async criarContaCorrente(criarContaCorrente: CriarContaCorrenteDto) {
        const resposta = await this.contaCorrenteService.criarContaCorrente(criarContaCorrente);
        return resposta;
    }
}