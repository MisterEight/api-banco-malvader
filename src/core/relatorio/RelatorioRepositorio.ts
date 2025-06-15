import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Relatorio } from './Relatorio';
import { tratarCodigosDeErroSql } from '../../utils/tratamentoDeErrosSql';

export class RelatorioRepositorio {
    constructor(private readonly pool: Pool) {}

    public async criarRelatorio(relatorio: Relatorio): Promise<any> {
        const sql = `
            INSERT INTO relatorios (
                id_relatorio,
                id_funcionario,
                tipo_relatorio,
                data_geracao,
                conteudo
            ) VALUES (?, ?, ?, ?, ?)
        `;

        const conexao = await this.pool.getConnection();

        try {
            await conexao.beginTransaction();

            await conexao.query<ResultSetHeader>(sql, [
                relatorio.getIdRelatorio(),
                relatorio.getIdFuncionario(),
                relatorio.getTipoRelatorio(),
                relatorio.getDataGeracao(),
                relatorio.getConteudo(),
            ]);

            await conexao.commit();
            conexao.release();

            return { id_relatorio: relatorio.getIdRelatorio() };
        } catch (erro: any) {
            await conexao.rollback();
            conexao.release();

            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                return erroTratado;
            }

            return {
                erro: true,
                mensagem: 'Erro ao inserir relatorio',
                codigo: 500,
            };
        }
    }
}
