import { v4 as uuidv4 } from 'uuid';

import { TipoTransacao } from "./interfaces/insterfaces";

export class Transacao {
    private id_transacao: string;
    private id_conta_origem: string;
    private id_conta_destino: string;
    private tipo_transacao: TipoTransacao;
    private valor: number;
    private data_hora: string;
    private descricao: string;

    constructor(
        id_conta_origem: string,
        id_conta_destino: string,
        tipo_transacao: TipoTransacao,
        valor: number,
        data_hora: string,
        descricao: string
    ) {
        this.id_transacao = uuidv4();
        this.id_conta_origem = id_conta_origem;
        this.id_conta_destino = id_conta_destino;
        this.tipo_transacao = tipo_transacao;
        this.valor = valor;
        this.data_hora = new Date(data_hora).toISOString().replace("T", " ").substring(0, 19);
        this.descricao = descricao;
    }


    public getIdTransacao(){
        return this.id_transacao;
    }

    public getIdContaOrigem(){
        return this.id_conta_origem;
    }

    public getIdContaDestino(){
        return this.id_conta_destino;
    }

    public getTipoTransacao(){
        return this.tipo_transacao;
    }

    public getValor(){
        return this.valor;
    }

    public getDataHora(){
        return this.data_hora;
    }

    public getDescricao(){
        return this.descricao;
    }
}
