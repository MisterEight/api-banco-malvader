import { Pool, ResultSetHeader } from "mysql2/promise";
import { ContaInvestimento } from "./ContaInvestimento";

export class ContaInvestimentoRepositorio {
    constructor(readonly pool: Pool){}

    async criarContaInvestimento(contaInvestimento: ContaInvestimento): Promise<any> {
        const sql = `
            INSERT INTO contas_investimento (
                id_conta_investimento,
                id_conta,
                perfil_risco,
                valor_minimo,
                taxa_rendimento_base
            ) VALUES (?, ?, ?, ?, ?)
        `
        const conexao = await this.pool.getConnection()

        try {
            conexao.beginTransaction()

            const [resultado] = await this.pool.query<ResultSetHeader>(sql, [
                contaInvestimento.getIdContaInvestimento(),
                contaInvestimento.getIdConta(),
                contaInvestimento.getPerfilRisco(),
                contaInvestimento.getValorMinimo(),
                contaInvestimento.getTaxaRendimento()
            ])

            conexao.commit()
            conexao.release()

            return {id_conta_investimento: contaInvestimento.getIdContaInvestimento()};

        } catch (erro: any){
            conexao.rollback()
            conexao.release()

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
                mensagem: "Erro ao criar conta investimento",
                codigo: 500
            }
        }

       
    }
}


// CREATE TABLE contas_investimento (
//   id_conta_investimento CHAR(36) PRIMARY KEY,
//   id_conta CHAR(36) NOT NULL UNIQUE,
//   perfil_risco ENUM('CONSERVADOR', 'MODERADO', 'ARROJADO') NOT NULL,
//   valor_minimo FLOAT NOT NULL,
//   taxa_rendimento_base FLOAT NOT NULL,
//   FOREIGN KEY (id_conta) REFERENCES conta(id_conta)
// );
