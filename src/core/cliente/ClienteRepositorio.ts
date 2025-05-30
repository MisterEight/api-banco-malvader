import { Pool, ResultSetHeader } from 'mysql2/promise';
import { pool } from '../../config/database'
import { Cliente } from './Cliente';
import { ClienteCriado, ErroPersonalizado } from './interfaces/cliente.intefaces';

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

            const [resultado] = await this.pool.query<ResultSetHeader>(sql, [
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

            console.log("Esse é o valor do erro: ", erro.code)

            
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
                codigo: 500,
                mensagem: "Erro ao criar cliente"
            }
        }
    }
}