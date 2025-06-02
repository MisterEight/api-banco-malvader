import { v4 as uuidv4 } from 'uuid';
import { TipoPerfilRisco } from "./interfaces/interfaces";

export class ContaInvestimento {
    private id_conta_investimento: string;
    private id_conta: string;
    private perfil_risco: TipoPerfilRisco;
    private valor_minimo: number;
    private taxa_rendimento_base: number;

    constructor(
        id_conta: string,
        perfil_risco: TipoPerfilRisco,
        valor_minimo: number,
        taxa_rendimento_base: number
    ) {
        this.id_conta_investimento = uuidv4()
        this.id_conta = id_conta;
        this.perfil_risco = perfil_risco;
        this.valor_minimo = valor_minimo;
        this.taxa_rendimento_base = taxa_rendimento_base;
    }

    public getIdContaInvestimento(){
        return this.id_conta_investimento;
    }

    public getIdConta() {
        return this.id_conta;
    }

    public getPerfilRisco(){
        return this.perfil_risco;
    }

    public getValorMinimo(){
        return this.valor_minimo;
    }

    public getTaxaRendimento() {
        return this.taxa_rendimento_base;
    }
}
