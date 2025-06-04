export enum TipoTransacao {
    TRANSFERENCIA =  'TRANSFERENCIA'
}


export interface ContaBuscaPorId {
    id_conta: string,
    tipo_conta: TipoTransacao,
    saldo: number
}

export interface InformacoesConta {
    nome: string
}