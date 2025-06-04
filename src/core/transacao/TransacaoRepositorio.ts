import { Pool, ResultSetHeader } from "mysql2/promise";
import { Transacao } from "./Transacao";
import { tratarCodigosDeErroSql } from "../../utils/tratamentoDeErrosSql";
import { ContaRepositorio } from "../conta/ContaRepositorio";

export class TransacaoRepositorio {
    constructor(
        readonly pool: Pool
    ){}

    public async inserirTransacao(transacao: Transacao): Promise<any> {
        const sql = `
            INSERT INTO transacoes (
                id_transacao,
                id_conta_origem,
                id_conta_destino,
                tipo_transacao,
                valor,
                data_hora,
                descricao
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `

        const conexao = await this.pool.getConnection()

        try {
            conexao.beginTransaction()

            const [resultado] = await this.pool.query<ResultSetHeader>(sql, [
                transacao.getIdTransacao(),
                transacao.getIdContaOrigem(),
                transacao.getIdContaDestino(),
                transacao.getTipoTransacao(),
                transacao.getValor(),
                transacao.getDataHora(),
                transacao.getDescricao()
            ])


            // Atualizar saldo recebedor e origem

            const sqlAtualizaSaldoOrigem = `
                UPDATE conta SET saldo = saldo - ? WHERE id_conta = ?
            `

            const sqlAtualizaSaldoDestino = `
                UPDATE conta SET saldo = saldo + ? WHERE id_conta = ?
            `
            
            try {
                const [resultadoUpdateOrigem]: any = await this.pool.query<ResultSetHeader>(sqlAtualizaSaldoOrigem, [transacao.getValor(), transacao.getIdContaOrigem()])
            } catch (erro){
                return {
                    erro: true,
                    mensagem: "Erro ao buscar conta de origem",
                    codigo: 500
                }
            }
            try {
                const [resultadoUpdateDestino]: any = await this.pool.query<ResultSetHeader>(sqlAtualizaSaldoDestino, [transacao.getValor(), transacao.getIdContaDestino()])
            } catch (erro){
                return {
                    erro: true,
                    mensagem: "Erro ao buscar conta de destino",
                    codigo: 500
                }
            }

            conexao.commit()
            conexao.release()

            return {resposta: "Transacao realizada com sucesso!"};
        } catch(erro: any){
            conexao.rollback()
            conexao.release()

            console.log(erro)
            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                return erroTratado;
            }
                        
            return {
                erro: true,
                mensagem: "Erro ao realizar a transacao",
                codigo: 500
            }
        }
    }
}

