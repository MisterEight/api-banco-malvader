import { v4 as uuidv4 } from 'uuid';

export class ContaCorrente {
    private id_conta_corrente: string;
    private id_conta: string;
    private limite: number;
    private data_vencimento: string;
    private taxa_manutencao: number;

    constructor(
        id_conta: string,
        limite: number,
        data_vencimento: string,
        taxa_manutencao: number
    ) {
        this.id_conta_corrente = uuidv4()
        this.id_conta = id_conta;
        this.limite = limite;
        this.data_vencimento = data_vencimento;
        this.taxa_manutencao = taxa_manutencao
    }


    public getIdContaCorrente(){
        return this.id_conta_corrente;
    }

    public getIdConta(){
        return this.id_conta;
    }

    public getLimite(){
        return this.limite;
    }

    public getDataVencimento(){
        return this.data_vencimento;
    }

    public getTaxaManutencao(){
        return this.taxa_manutencao;
    }
}
