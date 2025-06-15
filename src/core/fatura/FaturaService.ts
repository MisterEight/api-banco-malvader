
import { CriarFaturaDto } from "./dto/CriarFaturaDto";
import { FaturaContaCorrente } from "./Fatura";
import { FaturaContaCorrenteRepositorio } from "./FaturaRepositorio";
import { v4 as uuidv4 } from 'uuid';

export class FaturaContaCorrenteService {
    constructor(private readonly faturaRepositorio: FaturaContaCorrenteRepositorio) {}

    public async criarFatura(criarFaturaDto: CriarFaturaDto) {
        const fatura = new FaturaContaCorrente({
            id_fatura: uuidv4(),
            id_conta_corrente: criarFaturaDto.id_conta_corrente,
            competencia: new Date(criarFaturaDto.competencia),
            data_vencimento: new Date(criarFaturaDto.data_vencimento),
            valor: criarFaturaDto.valor,
            valor_pagamento: null,
            status: 'aberta'
        });

        const resposta = await this.faturaRepositorio.criarFatura(fatura);
        return resposta;
    }

    public async buscarFaturaPorId(id_fatura: string) {
        const resposta = await this.faturaRepositorio.buscarFaturaPorId(id_fatura);
        return resposta;
    }

    public async buscarFaturasAbertasPorContaCorrente(id_conta_corrente: string) {
        const resposta = await this.faturaRepositorio.buscarFaturasAbertasPorContaCorrente(id_conta_corrente);
        return resposta;
    }

    public async atualizarValorFatura(id_fatura: string, valor_pagamento: number) {
        const faturaAtual = await this.faturaRepositorio.buscarFaturaPorId(id_fatura);

        if (!faturaAtual || faturaAtual.erro) {
            return { erro: true, mensagem: "Fatura não encontrada.", codigo: 404 };
        }

        const novoValorPago = (faturaAtual.valor_pagamento || 0) + valor_pagamento;
        const novoStatus = novoValorPago >= faturaAtual.valor ? 'paga' : 'parcialmente_paga';

        const resposta = await this.faturaRepositorio.atualizarValorFatura(id_fatura, novoValorPago, novoStatus);
        return resposta;
    }
}