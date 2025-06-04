import { pool } from "../../config/database";
import { ContaRepositorio } from "../conta/ContaRepositorio";
import { CriarTransacaoDTO } from "./dto/CriarTransacaoDto";
import { TransacaoRepositorio } from "./TransacaoRepositorio";
import { TransacaoService } from "./TransacaoService";

export class TransacaoController {
    private transacaoService: TransacaoService;

    constructor(){
        const transacaoRepositorio: TransacaoRepositorio = new TransacaoRepositorio(pool);
        const contaRepositorio: ContaRepositorio = new ContaRepositorio(pool)
        this.transacaoService = new TransacaoService(transacaoRepositorio, contaRepositorio)
    }

    public async inserirTransacao(criarTransacaoDto: CriarTransacaoDTO){
        const resposta = await this.transacaoService.inserirTransacao(criarTransacaoDto)
        return resposta;
    }
}