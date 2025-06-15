import { CriarRelatorioDto } from './dto/CriarRelatorioDto';
import { Relatorio } from './Relatorio';
import { RelatorioRepositorio } from './RelatorioRepositorio';

export class RelatorioService {
    constructor(private readonly relatorioRepositorio: RelatorioRepositorio) {}

    public async criarRelatorio(dto: CriarRelatorioDto) {
        const relatorio = new Relatorio(dto.id_funcionario, dto.tipo_relatorio, dto.conteudo);
        const resposta = await this.relatorioRepositorio.criarRelatorio(relatorio);
        return resposta;
    }
}
