import { Pool, ResultSetHeader } from "mysql2/promise";
import { ContaPoupanca } from "./ContaPoupanca";
import { tratarCodigosDeErroSql } from "../../utils/tratamentoDeErrosSql";

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

            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                return erroTratado;
            }

            return {
                erro: true,
                mensagem: "Erro criar conta poupanca",
                codigo: 500
            }
        }
    }

    public async buscarTodasContaPoupancaPorCpf(id_usuario: string): Promise<any> {

        const sql = `
            SELECT cp.id_conta_poupanca
            FROM contas_poupanca cp
            LEFT OUTER JOIN conta ct
                ON ct.id_conta = cp.id_conta
            LEFT OUTER JOIN clientes cli 
                ON ct.id_cliente = cli.id_cliente
            LEFT OUTER JOIN usuarios us
                ON us.id_usuario = cli.id_usuario
            WHERE us.cpf = ?
        `

        try {

            const [resultado]: any = await this.pool.query<ResultSetHeader>(sql, [id_usuario])
            return resultado

        } catch (erro: any) {
            return {
                erro: true,
                mensagem: "Erro ao consultar conta poupança",
                codigo: 500
            }
        }

    }
}


