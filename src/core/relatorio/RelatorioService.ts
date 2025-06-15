import { CriarRelatorioDto } from './dto/CriarRelatorioDto';
import { Relatorio } from './Relatorio';
import { RelatorioRepositorio } from './RelatorioRepositorio';
import { gerarExcel, gerarPdf } from '../../utils/relatorios/exportarFinanceiro';

export class RelatorioService {
    constructor(private readonly relatorioRepositorio: RelatorioRepositorio) {}

    public async criarRelatorio(dto: CriarRelatorioDto) {
        const relatorio = new Relatorio(dto.id_funcionario, dto.tipo_relatorio, dto.conteudo);
        const resposta = await this.relatorioRepositorio.criarRelatorio(relatorio);
        return resposta;
    }

    public async exportarRelatorioFinanceiro(inicio: string, fim: string, formato: string) {
        const transacoes = await this.relatorioRepositorio.listarTransacoesPorPeriodo(inicio, fim);

        if (transacoes?.erro) {
            return transacoes;
        }

        if (formato === 'excel') {
            const buffer = await gerarExcel(transacoes);
            return { tipo: 'excel', buffer };
        }

        const buffer = await gerarPdf(transacoes);
        return { tipo: 'pdf', buffer };
    }
}
