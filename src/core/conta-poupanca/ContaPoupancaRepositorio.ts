import { Pool, ResultSetHeader } from "mysql2/promise";
import { ContaPoupanca } from "./ContaPoupanca";

export class ContaPoupancaRepositorio {
    constructor(readonly pool: Pool){}

    public async criarContaPoupanca(contaPoupanca: ContaPoupanca): Promise<any> {
        const sql = `
            INSERT INTO contas_poupanca (
                id_conta_poupanca,
                id_conta,
                taxa_rendimento,
                ultimo_rendimento
            ) VALUES (?, ?, ?, ?)
        `

        const conexao = await this.pool.getConnection();

        try {
            conexao.beginTransaction()

            const [resposta]: any = await this.pool.query<ResultSetHeader>(sql, [
                contaPoupanca.getIdContaPoupanca(),
                contaPoupanca.getIdConta(),
                contaPoupanca.getTaxaRendimento(),
                contaPoupanca.getUltimoRendimento()
            ])

            conexao.commit()
            conexao.release()

            return {id_conta_poupanca: contaPoupanca.getIdContaPoupanca()}
        } catch (erro: any){
            conexao.rollback()
            conexao.release()

              if(erro.code === 'ER_NO_REFERENCED_ROW_2'){
                return {
                    erro: true,
                    mensagem: `Algo errado com a chave estrangeira.`,
                    codigo: 500
                }
            }

            if(erro.code === 'ER_DUP_ENTRY'){
                return {
                    erro: true,
                    mensagem: `Existem identificadores únicos que estão sendo duplicados.`,
                    codigo: 500
                }
            }

            if(erro.code === 'ER_CHECK_CONSTRAINT_VIOLATED'){
                return {
                    erro: true,
                    mensagem: `Constraint violada.`,
                    codigo: 500
                }
            }

            return {
                erro: true,
                mensagem: "Erro criar conta poupanca",
                codigo: 500
            }
        }
    }
}


