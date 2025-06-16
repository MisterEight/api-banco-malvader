import { v4 as uuidv4 } from 'uuid';

export class Emprestimo {
    private id_emprestimo: string;
    private id_conta: string;
    private valor_solicitado: number;
    private taxa_juros_mensal: number;
    private prazo_meses: number;
    private valor_total_devido: number;
    private data_solicitacao: string;
    private data_resposta: string | null;
    private status: string;
    private score_risco: number;

    constructor(
        id_conta: string,
        valor_solicitado: number,
        taxa_juros_mensal: number,
        prazo_meses: number,
        status: string = 'PENDENTE',
        score_risco: number = 0
    ) {
        this.id_emprestimo = uuidv4();
        this.id_conta = id_conta;
        this.valor_solicitado = valor_solicitado;
        this.taxa_juros_mensal = taxa_juros_mensal;
        this.prazo_meses = prazo_meses;
        this.valor_total_devido = valor_solicitado + (((taxa_juros_mensal / 100) * valor_solicitado )* prazo_meses);
        this.data_solicitacao = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.data_resposta = null;
        this.status = status;
        this.score_risco = score_risco;
    }

    public getIdEmprestimo(): string {
        return this.id_emprestimo;
    }

    public getIdConta(): string {
        return this.id_conta;
    }

    public getValorSolicitado(): number {
        return this.valor_solicitado;
    }

    public getTaxaJurosMensal(): number {
        return this.taxa_juros_mensal;
    }

    public getPrazoMeses(): number {
        return this.prazo_meses;
    }

    public getValorTotalDevido(): number {
        return this.valor_total_devido;
    }

    public getDataSolicitacao(): string {
        return this.data_solicitacao;
    }

    public getDataResposta(): string | null {
        return this.data_resposta;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(novoStatus: string) {
        this.status = novoStatus;
    }

    public getScoreRisco(): number {
        return this.score_risco;
    }

    public setScoreRisco(score: number) {
        this.score_risco = score;
    }
}
