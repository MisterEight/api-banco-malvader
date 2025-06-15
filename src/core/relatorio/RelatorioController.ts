import { pool } from '../../config/database';
import { RelatorioRepositorio } from './RelatorioRepositorio';
import { RelatorioService } from './RelatorioService';
import { CriarRelatorioDto } from './dto/CriarRelatorioDto';

export class RelatorioController {
    private relatorioService: RelatorioService;

    constructor() {
        const relatorioRepositorio = new RelatorioRepositorio(pool);
        this.relatorioService = new RelatorioService(relatorioRepositorio);
    }

    public async criarRelatorio(dto: CriarRelatorioDto) {
        const resposta = await this.relatorioService.criarRelatorio(dto);
        return resposta;
    }

    public async exportarRelatorioFinanceiro(inicio: string, fim: string, formato: string) {
        const resposta = await this.relatorioService.exportarRelatorioFinanceiro(inicio, fim, formato);
        return resposta;
    }
}
