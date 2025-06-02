import { Pool, ResultSetHeader } from "mysql2/promise";
import { ContaService } from "./ContaService";
import { Conta } from "./Conta";

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

            console.log(erro)

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

            return {
                erro: true,
                mensagem: "Erro ao inserir conta",
                codigo: 500
            }
        }
    }
}
