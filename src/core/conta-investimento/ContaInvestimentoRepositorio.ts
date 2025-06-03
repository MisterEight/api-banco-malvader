import { Pool, ResultSetHeader } from "mysql2/promise";
import { ContaInvestimento } from "./ContaInvestimento";
import { tratarCodigosDeErroSql } from "../../utils/tratamentoDeErrosSql";

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

            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                return erroTratado;
            }
            return {
                erro: true,
                mensagem: "Erro ao criar conta investimento",
                codigo: 500
            }
        }

       
    }
}

