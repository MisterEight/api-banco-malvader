import { v4 as uuidv4 } from 'uuid';

export class Agencia {
    private id_agencia: string;
    private nome: string;

    constructor(
        nome: string
    ) {
        this.id_agencia = uuidv4(),
        this.nome = nome
    }

    public getIdAgencia() {
        return this.id_agencia;
    }

    public getNome() {
        return this.nome;
    }
}