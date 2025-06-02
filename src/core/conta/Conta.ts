import { v4 as uuidv4 } from 'uuid';
import { TipoConta } from './interfaces/interfaces';

export class Conta {
    private id_conta: string;
    private id_agencia: string;
    private tipo_conta: TipoConta
    private saldo: number;
    private id_cliente: string;
    private data_abertura: string;
    private status: number 

    constructor(
        id_agencia: string,
        saldo: number,
        id_cliente: string,
        data_abertura: string,
        status: number,
        tipo_conta: TipoConta
    ){
        this.id_conta = uuidv4(),
        this.id_agencia = id_agencia,
        this.saldo = saldo,
        this.id_cliente = id_cliente,
        this.data_abertura = data_abertura,
        this.status = status
        this.tipo_conta = tipo_conta
    }

    public getIdConta(){
        return this.id_conta;
    }

    public getIdAgencia(){
        return this.id_agencia
    }

    public getSaldo(){
        return this.saldo;
    }

    public getIdCliente(){
        return this.id_cliente;
    }

    public getDataAbertura(){
        return this.data_abertura;
    }

    public getStatus(){
        return this.status;
    }

    public getTipoConta(){
        return this.tipo_conta;
    }
}