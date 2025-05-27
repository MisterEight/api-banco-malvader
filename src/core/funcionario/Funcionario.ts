export class Funcionario {
    private nome: string;
    private codigo_funcionario?: string;
    private cargo: string;
    private id_supervisor: number | null;

    constructor(nome: string,  cargo: string, id_supervisor: number | null){
        this.nome = nome;
        this.cargo = cargo;
        this.id_supervisor = id_supervisor ? id_supervisor : null
    }

    set setCodigoFuncionario(codigo: string){
        this.codigo_funcionario = codigo;
    }

      public dadosTratados(): Record<string, any> {
        return {
            nome: this.nome,
            codigo_funcionario: this.codigo_funcionario,
            cargo: this.cargo,
            id_supervisor: this.id_supervisor,
        };
    }

    public dadosParaInserir(): Record<string, any> {
        return {
            nome: this.nome,
            cargo: this.cargo,
            id_supervisor: this.id_supervisor
        }
    }
}