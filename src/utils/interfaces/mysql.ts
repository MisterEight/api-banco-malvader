
export interface RetornoInsert {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
}



export interface InputsSQL {
  nomeInput: string,
  tipoInput: string,
  valorInput: any
}