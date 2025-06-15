import { v4 as uuidv4 } from 'uuid';

export class Relatorio {
    private id_relatorio: string;
    private id_funcionario: string;
    private tipo_relatorio: string;
    private data_geracao: string;
    private conteudo: string;

    constructor(id_funcionario: string, tipo_relatorio: string, conteudo: string) {
        this.id_relatorio = uuidv4();
        this.id_funcionario = id_funcionario;
        this.tipo_relatorio = tipo_relatorio;
        this.conteudo = conteudo;
        this.data_geracao = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    public getIdRelatorio() {
        return this.id_relatorio;
    }

    public getIdFuncionario() {
        return this.id_funcionario;
    }

    public getTipoRelatorio() {
        return this.tipo_relatorio;
    }

    public getDataGeracao() {
        return this.data_geracao;
    }

    public getConteudo() {
        return this.conteudo;
    }
}
