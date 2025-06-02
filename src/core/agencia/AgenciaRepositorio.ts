import { Pool, ResultSetHeader } from "mysql2/promise";
import { Agencia } from "./Agencia";

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

             if(erro.code === 'ER_NO_REFERENCED_ROW_2'){
                return {
                    erro: true,
                    mensagem: `A chave estrangeira de usuario não existe.`,
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

            return  {
                erro: true,
                mensagem: "Erro ao inserir agencia",
                codigo: 500
            }
        }
    }
}