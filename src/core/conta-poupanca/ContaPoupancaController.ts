import { pool } from "../../config/database";
import { ContaPoupancaRepositorio } from "./ContaPoupancaRepositorio";
import { ContaPoupancaService } from "./ContaPoupancaService";
import { CriarContaPoupancaDto } from "./dto/CriarContaPoupanca";

export class ContaPoupancaController {
    private contaPoupancaService: ContaPoupancaService;

    constructor(){
        const contaPoupancaRepositorio = new ContaPoupancaRepositorio(pool)
        this.contaPoupancaService =  new ContaPoupancaService(contaPoupancaRepositorio)
    }

    public async criarContaPoupanca(criarContaPoupancaDto: CriarContaPoupancaDto){
        const resposta = await this.contaPoupancaService.criarContaPoupanca(criarContaPoupancaDto);
        return resposta;
    }
}