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
}
