import { pool } from "../../config/database";
import { ContaRepositorio } from "../conta/ContaRepositorio";
import { ContaCorrenteRepositorio } from "./ContaCorrenteRepositorio";
import { ContaCorrenteService } from "./ContaCorrenteService";
import { CriarContaCorrenteDto } from "./dto/CriarContaCorrenteDto";
import { SaqueDepositoDto } from "./dto/SaqueDepositoDto";

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

    public async buscarTodasContasCorrentesPorCpf(id_usuario: string){
        const resposta = await this.contaCorrenteService.buscarTodasContaCorrentesPorCpf(id_usuario)
        return resposta
    }

    public async buscarInformacoesDaContaCorrentePorId(id_conta_corrente: string){
        const resposta = await this.contaCorrenteService.buscarInformacoesDaContaCorrentePorId(id_conta_corrente)
        return resposta
    }

    public async sacarSaldo(sacarSaldoDto: SaqueDepositoDto){
        const resposta = await this.contaCorrenteService.sacarSaldo(sacarSaldoDto);
        return resposta;
    }

    public async depositar(depositoDto: SaqueDepositoDto) {
        const resposta = await this.contaCorrenteService.depositar(depositoDto);
        return resposta;
    }
}