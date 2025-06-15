import { pool } from "../../config/database";
import { CriarFaturaDto } from "./dto/CriarFaturaDto";
import { FaturaContaCorrenteRepositorio } from "./FaturaRepositorio";
import { FaturaContaCorrenteService } from "./FaturaService";

export class FaturaContaCorrenteController {
    private faturaService: FaturaContaCorrenteService;

    constructor() {
        const faturaRepositorio = new FaturaContaCorrenteRepositorio(pool);
        this.faturaService = new FaturaContaCorrenteService(faturaRepositorio);
    }

    public async criarFatura(criarFaturaDto: CriarFaturaDto) {
        const resposta = await this.faturaService.criarFatura(criarFaturaDto);
        return resposta;
    }

    public async buscarFaturaPorId(id_fatura: string) {
        const resposta = await this.faturaService.buscarFaturaPorId(id_fatura);
        return resposta;
    }

    public async buscarFaturasAbertasPorContaCorrente(id_conta_corrente: string) {
        const resposta = await this.faturaService.buscarFaturasAbertasPorContaCorrente(id_conta_corrente);
        return resposta;
    }

    public async atualizarValorFatura(id_fatura: string, valor_pagamento: number) {
        const resposta = await this.faturaService.atualizarValorFatura(id_fatura, valor_pagamento);
        return resposta;
    }
}