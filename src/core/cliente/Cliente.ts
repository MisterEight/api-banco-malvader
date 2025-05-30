import { v4 as uuidv4 } from 'uuid';

export class Cliente {
    private id_cliente: string;
    private id_usuario: string;
    private score_credito: number;

    constructor(
        id_usuario: string,
    ){
        this.id_cliente = uuidv4();
        this.id_usuario = id_usuario;
        this.score_credito = 0;
    }

    public getIdUsuario(){
        return this.id_usuario;
    }
    public getIdCliente(){
        return this.id_cliente;
    }
    public getScore(){
        return this.score_credito;
    }

    public setScore(valor: number){
        if(valor >= 0 && valor <= 1000){
            this.score_credito = valor;
        } else {
            throw new Error("Valor do score não está dentro das regras")
        }
    }
}