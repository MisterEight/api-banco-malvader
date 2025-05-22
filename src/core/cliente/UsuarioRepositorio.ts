import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Usuario } from './Usuario';
import { Erro } from '../../utils/interfaces/respostas';
import { BuscarUsuarioCpf } from './dto/BuscaPorCpf.dto';

export class UsuarioRepositorio {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    public async criar(usuario: Usuario): Promise<any | Erro> {
        const conexao = this.pool.getConnection()

        try {
            //                  INICIO TRANSAÇÃO
            // =======================================================================================
            (await conexao).beginTransaction() 

            const sql = `
                INSERT INTO usuarios 
                SET ?
                `;
            const [resultado] = await this.pool.query<ResultSetHeader>(sql, {
                nome: usuario.nome,
                cpf: usuario.cpf,
                data_nascimento: usuario.data_nascimento,
                tipo_usuario: usuario.tipo_usuario,
                telefone: usuario.telefone,
                senha_hash: usuario.senha_hash,
                otp_ativo: usuario.otp_ativo,
                otp_expiracao: usuario.otp_expiracao
            });


            (await conexao).commit();

            //             TRANSAÇÃO BEM SUCEDIDA COMMIT
            //==========================================================================================

            /** Libero a conexão após a transação ser concluida */
            (await conexao).release() 
             return resultado;
        } catch(erro){

            (await conexao).rollback();
            //  EM CASO DE ERRO - ROLLBACK
            // =====================================

            /** Libero a conexão */
            (await conexao).release();

            return {erro: erro, mensagem: "Erro na operação do banco de dados."}
        }
       
    }

    public async buscarUsuarioPorCpf(params: BuscarUsuarioCpf): Promise<any> {

        const sql = `
                SELECT
                    id_usuario,
                    nome,
                    cpf,
                    telefone 
                FROM usuarios WHERE cpf = ?;
            `
        const [resultado]: any = await this.pool.query(sql, [params.cpf]);
        return resultado[0];
    }

    public async buscarUsuarioPorId(id: number): Promise<any>{
        const sql = `
            SELECT 
                id_usuario,
                nome,
                cpf,
                telefone 
            FROM usuarios
            WHERE id_usuario = ?;
        `

        const [resultado] = await this.pool.query(sql, [id]);
        return resultado;
    }


    // Função reservada para processos internos da API, não expor no controller */
    public async verificaSeUsuarioExisteBoolean(cpf: string): Promise<boolean> {
        const sql = `
            SELECT COUNT(cpf) as total
            FROM usuarios WHERE cpf = ?;
        `;

        const [resultado]: any = await this.pool.query(sql, [cpf]);

        // Se retornar 1, existe conta logo valor true, caso contrário false.
        if (!!resultado[0].total) {
            return true;
        } else {
            return false;
        }
    }
}