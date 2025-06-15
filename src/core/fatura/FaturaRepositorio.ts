// FaturaContaCorrenteRepositorio.ts

import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { FaturaContaCorrente } from "./Fatura";
import { tratarCodigosDeErroSql } from "../../utils/tratamentoDeErrosSql";

export class FaturaContaCorrenteRepositorio {
    constructor(private readonly pool: Pool) {}

    public async criarFatura(fatura: FaturaContaCorrente): Promise<any> {
        const sql = `
            INSERT INTO faturas_conta_corrente (
                id_fatura, id_conta_corrente, competencia, data_vencimento, 
                valor, valor_pagamento, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const conexao = await this.pool.getConnection();
        try {
            await conexao.beginTransaction();
            await conexao.query<ResultSetHeader>(sql, [
                fatura.id_fatura, fatura.id_conta_corrente, fatura.competencia,
                fatura.data_vencimento, fatura.valor, fatura.valor_pagamento, fatura.status
            ]);
            await conexao.commit();
            return { id_fatura: fatura.id_fatura };
        } catch (erro: any) {
            await conexao.rollback();
            console.log(erro);
            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) return erroTratado;
            return { erro: true, mensagem: "Erro ao inserir fatura", codigo: 500 };
        } finally {
            conexao.release();
        }
    }

    // NOVOS MÉTODOS ADICIONADOS ABAIXO

    public async buscarFaturaPorId(id_fatura: string): Promise<any> {
        const sql = "SELECT * FROM faturas_conta_corrente WHERE id_fatura = ?";
        try {
            const [rows] = await this.pool.query<RowDataPacket[]>(sql, [id_fatura]);
            if (rows.length === 0) {
                return { erro: true, mensagem: "Fatura não encontrada", codigo: 404 };
            }
            return rows[0] as FaturaContaCorrente;
        } catch (erro: any) {
            console.log(erro);
            return { erro: true, mensagem: "Erro ao buscar fatura", codigo: 500 };
        }
    }

    public async buscarFaturasAbertasPorContaCorrente(id_conta_corrente: string): Promise<any> {
        const sql = "SELECT * FROM faturas_conta_corrente WHERE id_conta_corrente = ? AND status IN ('aberta', 'parcialmente_paga')";
        try {
            const [rows] = await this.pool.query<RowDataPacket[]>(sql, [id_conta_corrente]);
            return rows as FaturaContaCorrente[];
        } catch (erro: any) {
            console.log(erro);
            return { erro: true, mensagem: "Erro ao buscar faturas abertas", codigo: 500 };
        }
    }
    
    public async atualizarValorFatura(id_fatura: string, valor_pagamento: number, status: string): Promise<any> {
        const sql = "UPDATE faturas_conta_corrente SET valor_pagamento = ?, status = ? WHERE id_fatura = ?";
        const conexao = await this.pool.getConnection();
        try {
            await conexao.beginTransaction();
            const [resposta] = await conexao.query<ResultSetHeader>(sql, [valor_pagamento, status, id_fatura]);
            
            if (resposta.affectedRows === 0) {
                 await conexao.rollback();
                 return { erro: true, mensagem: "Fatura não encontrada para atualização.", codigo: 404 };
            }

            await conexao.commit();
            return { id_fatura: id_fatura, status: status };
        } catch (erro: any) {
            await conexao.rollback();
            console.log(erro);
            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) return erroTratado;
            return { erro: true, mensagem: "Erro ao atualizar fatura", codigo: 500 };
        } finally {
            conexao.release();
        }
    }
}