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
}
