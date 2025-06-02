import { v4 as uuidv4 } from 'uuid';

export class ContaPoupanca {
    private id_conta_poupanca: string;
    private id_conta: string;
    private taxa_rendimento: number;
    private ultimo_rendimento: number;

    constructor(
        id_conta: string,
        taxa_rendimento: number,
        ultimo_rendimento: number
    ) {
        this.id_conta_poupanca = uuidv4();
        this.id_conta = id_conta;
        this.taxa_rendimento = taxa_rendimento;
        this.ultimo_rendimento = ultimo_rendimento;
    }

    public getIdContaPoupanca() {
        return this.id_conta_poupanca;
    }

    public getIdConta(){
        return this.id_conta;
    }

    public getTaxaRendimento(){
        return this.taxa_rendimento;
    }

    public getUltimoRendimento() {
        return this.ultimo_rendimento;
    }
}
