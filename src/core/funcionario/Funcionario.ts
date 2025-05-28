import { v4 as uuidv4 } from 'uuid';

export class Funcionario {
    private id_funcionario: string;
    private nome: string;
    private codigo_funcionario?: string;
    private cargo: string;
    private id_supervisor: number | null;

    // FK
    private id_usuario: string

    constructor(nome: string,  cargo: string, id_supervisor: number | null, id_usuario: string){
        this.id_funcionario = uuidv4()
        this.nome = nome;
        this.cargo = cargo;
        this.id_supervisor = id_supervisor ? id_supervisor : null

        // fk
        this.id_usuario = id_usuario
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

            id_usuario: this.id_usuario
        };
    }

    public dadosParaInserir(): Record<string, any> {
        return {
            id_funcionario: this.id_funcionario,
            nome: this.nome,
            cargo: this.cargo,
            id_supervisor: this.id_supervisor,

            // fk
            id_usuario: this.id_usuario
        }
    }
}