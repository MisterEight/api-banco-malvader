import { Pool, ResultSetHeader } from "mysql2/promise";
import { ContaInvestimento } from "./ContaInvestimento";
import { tratarCodigosDeErroSql } from "../../utils/tratamentoDeErrosSql";

export class ContaInvestimentoRepositorio {
    constructor(readonly pool: Pool) { }

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

            return { id_conta_investimento: contaInvestimento.getIdContaInvestimento() };

        } catch (erro: any) {
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

    public async buscarTodasContaInvestimentoPorCpf(cpf: string): Promise<any> {

        const sql = `
            SELECT ci.id_conta_investimento
            FROM contas_investimento ci
            LEFT OUTER JOIN conta ct
                ON ct.id_conta = ci.id_conta
            LEFT OUTER JOIN clientes cli 
                ON ct.id_cliente = cli.id_cliente
            LEFT OUTER JOIN usuarios us
                ON us.id_usuario = cli.id_usuario
            WHERE us.cpf = ?
        `

        try {

            const [resultado]: any = await this.pool.query<ResultSetHeader>(sql, [cpf])
            return resultado

        } catch (erro: any) {
            
            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                return erroTratado;
            }

            return {
                erro: true,
                mensagem: "Erro ao consultar conta poupança",
                codigo: 500
            }
        }

    }
}

