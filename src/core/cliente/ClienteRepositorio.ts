import { Pool, ResultSetHeader } from 'mysql2/promise';
import { pool } from '../../config/database'
import { Cliente } from './Cliente';
import { ClienteCriado, ErroPersonalizado } from './interfaces/cliente.intefaces';
import { tratarCodigosDeErroSql } from '../../utils/tratamentoDeErrosSql';

export class ClienteRepositorio {
    constructor(
        private readonly pool: Pool
    ) {}

    public async criarCliente(cliente: Cliente): Promise<ClienteCriado | ErroPersonalizado> {
        const sql = `
            INSERT INTO clientes (
                id_cliente,
                id_usuario,
                score_credito
            ) VALUES (?, ?, ?)
        `

        const conexao = await this.pool.getConnection()

        try {
            conexao.beginTransaction()

            const [resultado] = await conexao.query<ResultSetHeader>(sql, [
                cliente.getIdCliente(), 
                cliente.getIdUsuario(), 
                cliente.getScore()
            ]);

            conexao.commit();
            conexao.release();

            return {id_cliente: cliente.getIdCliente()};
        } catch (erro: any){
            conexao.rollback()
            conexao.release()
            
            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                return erroTratado;
            }

            return {
                erro: true,
                codigo: 500,
                mensagem: "Erro ao criar cliente"
            }
        }
    }
}