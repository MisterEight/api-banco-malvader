import { Pool, ResultSetHeader } from "mysql2/promise";
import { Agencia } from "./Agencia";
import { tratarCodigosDeErroSql } from "../../utils/tratamentoDeErrosSql";

export class AgenciaRepositorio {
    constructor(
        readonly pool: Pool
    ) {}

    public async criarAgencia(agencia: Agencia): Promise<any> {
        const sql = `  
            CALL inserir_agencia(?, ?)
        `

        const conexao = await this.pool.getConnection()

        try{
            conexao.beginTransaction()

            const [resultado]: any = await this.pool.query<ResultSetHeader>(sql, [
                agencia.getIdAgencia(),
                agencia.getNome()
            ]);

            conexao.commit()
            conexao.release()

            return resultado[0][0];

        } catch(erro: any){
            conexao.rollback()
            conexao.release()

            if (tratarCodigosDeErroSql(erro)) {
                return tratarCodigosDeErroSql(erro)
            } 

            return  {
                erro: true,
                mensagem: "Erro ao inserir agencia",
                codigo: 500
            }
        }
    }
}