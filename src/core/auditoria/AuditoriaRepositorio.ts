import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Auditoria } from './Auditoria';
import { tratarCodigosDeErroSql } from '../../utils/tratamentoDeErrosSql';

export class AuditoriaRepositorio {
    constructor(private readonly pool: Pool) {}

    public async inserirAuditoria(auditoria: Auditoria): Promise<any> {
        const sql = `
            INSERT INTO auditoria (
                id_auditoria,
                id_usuario,
                acao,
                data_hora,
                detalhes
            ) VALUES (?, ?, ?, ?, ?)
        `;
        const conexao = await this.pool.getConnection();
        try {
            await conexao.beginTransaction();
            const [resultado] = await conexao.query<ResultSetHeader>(sql, [
                auditoria.getIdAuditoria(),
                auditoria.getIdUsuario(),
                auditoria.getAcao(),
                auditoria.getDataHora(),
                auditoria.getDetalhes()
            ]);
            await conexao.commit();
            conexao.release();
            return resultado;
        } catch (erro: any) {
            await conexao.rollback();
            conexao.release();
            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                return erroTratado;
            }
            return { erro: true, mensagem: 'Erro ao inserir auditoria', codigo: 500 };
        }
    }
}
