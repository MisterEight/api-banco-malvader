import { Pool, ResultSetHeader } from "mysql2/promise";
import { Emprestimo } from "./Emprestimo";
import { tratarCodigosDeErroSql } from "../../utils/tratamentoDeErrosSql";

export class EmprestimoRepositorio {
    constructor(readonly pool: Pool) { }


    public async criarEmprestimo(emprestimo: Emprestimo): Promise<any> {
        const sql = `
            INSERT INTO emprestimos (
                id_emprestimo,
                id_conta,
                valor_solicitado,
                taxa_juros_mensal,
                prazo_meses,
                valor_total_devido,
                data_solicitacao,
                data_resposta,
                status,
                score_risco
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        const conexao = await this.pool.getConnection()

        try {
            conexao.beginTransaction()

            const [resposta]: any = await this.pool.query<ResultSetHeader>(sql, [
                emprestimo.getIdEmprestimo(),
                emprestimo.getIdConta(),
                emprestimo.getValorSolicitado(),
                emprestimo.getTaxaJurosMensal(),
                emprestimo.getPrazoMeses(),
                emprestimo.getValorTotalDevido(),
                emprestimo.getDataSolicitacao(),
                emprestimo.getDataResposta(),
                emprestimo.getStatus(),
                emprestimo.getScoreRisco()
            ])


            conexao.commit()
            conexao.release()

            return { id_emprestimo: emprestimo.getIdEmprestimo() }
        } catch (erro: any) {
            
            console.log(erro)

            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                return erroTratado;
            }

            return {
                erro: true,
                mensagem: "Erro ao inserir emprestimo",
                codigo: 500
            }
        }
    }
}