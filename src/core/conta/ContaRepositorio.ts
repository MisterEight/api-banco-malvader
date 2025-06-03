import { Pool, ResultSetHeader } from "mysql2/promise";
import { ContaService } from "./ContaService";
import { Conta } from "./Conta";
import { tratarCodigosDeErroSql } from "../../utils/tratamentoDeErrosSql";

export class ContaRepositorio {
    constructor(readonly pool: Pool){}

    public async criarConta(conta: Conta): Promise<any> {
        const sql = `
            CALL inserir_conta(?, ?, ?, ?, ?, ?, ?) 
        `
        const conexao = await this.pool.getConnection();

        try {
            conexao.beginTransaction();

            const [resposta]: any = await this.pool.query<ResultSetHeader>(sql, [
                conta.getIdConta(),
                conta.getIdAgencia(),
                conta.getIdCliente(),
                conta.getSaldo(),
                conta.getDataAbertura(),
                conta.getStatus(),
                conta.getTipoConta()
            ]);

            conexao.commit();
            conexao.release();
         
            return resposta[0][0];
        } catch(erro: any){
            conexao.rollback();
            conexao.release();

            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                return erroTratado;
            }

            return {
                erro: true,
                mensagem: "Erro ao inserir conta",
                codigo: 500
            }
        }
    }

    // Essa função será utilizado nos modulos de CC, CP e CI - pode haver outras utilizações.
    public async contaJaEstaSendoUsada(uuid: string): Promise<any> {
        const sql = `
            SELECT c.id_conta, 
            CASE 
                WHEN cc.id_conta IS NOT NULL THEN 'Conta Corrente'
                WHEN p.id_conta IS NOT NULL THEN 'Poupança'
                WHEN ci.id_conta IS NOT NULL THEN 'Investimento'
                ELSE 'Nenhuma'
            END AS tipo_utilizacao
            FROM conta c
                LEFT JOIN contas_corrente cc ON cc.id_conta = c.id_conta
                LEFT JOIN contas_poupanca p ON p.id_conta = c.id_conta
                LEFT JOIN contas_investimento ci ON ci.id_conta = c.id_conta
            WHERE c.id_conta = ?;
        `

        try {
            const [resposta]: any = await this.pool.query<ResultSetHeader>(sql, [uuid]);
            return resposta;
        } catch (erro: any){
            throw new Error(`Erro ao consultar disponibilidade da conta`)
        }
    }
}
