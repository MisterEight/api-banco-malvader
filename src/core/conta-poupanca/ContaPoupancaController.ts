import { pool } from "../../config/database";
import { ContaRepositorio } from "../conta/ContaRepositorio";
import { ContaPoupancaRepositorio } from "./ContaPoupancaRepositorio";
import { ContaPoupancaService } from "./ContaPoupancaService";
import { CriarContaPoupancaDto } from "./dto/CriarContaPoupanca";

export class ContaPoupancaController {
    private contaPoupancaService: ContaPoupancaService;

    constructor(){
        const contaPoupancaRepositorio = new ContaPoupancaRepositorio(pool)
        const contaRepositorio = new ContaRepositorio(pool)
        this.contaPoupancaService =  new ContaPoupancaService(contaPoupancaRepositorio, contaRepositorio)
    }

    public async criarContaPoupanca(criarContaPoupancaDto: CriarContaPoupancaDto){
        const resposta = await this.contaPoupancaService.criarContaPoupanca(criarContaPoupancaDto);
        return resposta;
    }
}