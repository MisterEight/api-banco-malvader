export type StatusFatura =
  | 'aberta'
  | 'paga_em_dia'
  | 'pagamento_parcial'
  | 'atraso_1_mes'
  | 'atraso_2_meses'
  | 'atraso_3_meses'
  | 'atraso_4_meses'
  | 'atraso_5_meses'
  | 'atraso_6_meses'
  | 'atraso_7_meses'
  | 'atraso_8_meses'
  | 'atraso_9m_ou_mais';

export class FaturaContaCorrente {
  id_fatura: string;
  id_conta_corrente: string;
  competencia: Date;
  data_vencimento: Date;
  valor: number;
  valor_pagamento: number | null;
  status: StatusFatura;

  constructor(data: Partial<FaturaContaCorrente>) {
    this.id_fatura = data.id_fatura!;
    this.id_conta_corrente = data.id_conta_corrente!;
    this.competencia = data.competencia!;
    this.data_vencimento = data.data_vencimento!;
    this.valor = data.valor!;
    this.valor_pagamento = data.valor_pagamento ?? null;
    this.status = data.status!;
  }
}
