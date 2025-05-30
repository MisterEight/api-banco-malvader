import { Pool, ResultSetHeader } from 'mysql2/promise';
import { LoginUsuarioDTO } from './dto/LoginUsuario.dto';
import { montarSQL } from '../../utils/montador-sql';
import { InputsSQL } from '../../utils/interfaces/mysql';
import { Usuario } from '../../core/usuario/Usuario';

export class AuthUsuarioRepositorio {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

        public async buscarUsuarioPorCpfLogin(loginUsuarioDTO: LoginUsuarioDTO): Promise<any> {
    
            const sql = `
                    SELECT
                        id_usuario,
                        nome,
                        cpf,
                        senha_hash,
                        tipo_usuario
                    FROM usuarios WHERE cpf = ?;
                `
            const [resultado]: any = await this.pool.query(sql, [loginUsuarioDTO.cpf]);
            return resultado[0];
        }

        public async buscarUsuarioPorIdDadosOtp(id_usuario: number){
            const sql = `
                SELECT 
                    id_usuario,
                    otp_codigo,
                    otp_expiracao,
                    otp_utilizado,
                    cpf,
                    nome,
                    tipo_usuario
                FROM usuarios
                WHERE id_usuario = ?
            `
            const [resultado]: any = await this.pool.query(sql, [id_usuario]);
            return resultado[0];
        }

        public async verificaOtpAtivoUsuario(loginUsuarioDTO: LoginUsuarioDTO): Promise<any> {
            const sql = `
               SELECT 
                    CASE WHEN otp_ativo = 1 THEN true ELSE false END AS otpEstaAtivo
                FROM usuarios 
                WHERE cpf = ?;

            `
            const [resultado]: any = await this.pool.query(sql, [loginUsuarioDTO.cpf]);
            return resultado[0];
        }

        public async gerarOtp(loginUsuarioDTO: LoginUsuarioDTO): Promise<any> {
            const conexao = await this.pool.getConnection()

             try {
            //                  INICIO TRANSAÇÃO
            // =======================================================================================
                await conexao.beginTransaction() 

                const sql = `
                UPDATE usuarios
                SET 
                    otp_codigo = ?,
                    otp_expiracao = ?,
                    otp_utilizado = 0
                WHERE cpf = ?
                `
                const usuario = new Usuario({})
                usuario.gerarOtp()

                const inputs = {
                    codigoOtp: usuario.getOtp(),
                    dataExpiracaoOtp: usuario.otp_expiracao,
                    cpf: loginUsuarioDTO.cpf
                }

                const [resultado]: any = await this.pool.query(sql, [inputs.codigoOtp, inputs.dataExpiracaoOtp, inputs.cpf]);

                 await conexao.commit();

                //             TRANSAÇÃO BEM SUCEDIDA COMMIT
                //==========================================================================================

                /** Libero a conexão após a transação ser concluida */
                conexao.release() 
                return resultado[0];

             } catch (erro){
                    await conexao.rollback();
                    //  EM CASO DE ERRO - ROLLBACK
                    // =====================================

                    //console.log(erro)
                    /** Libero a conexão */
                    conexao.release();
                    return {erro: erro, mensagem: "Erro na operação do banco de dados."}
             }

            
        }

        public async marcarOtpComoUtilizado(id_usuario: number): Promise<any> {
              const conexao = await this.pool.getConnection()

             try {
            //                  INICIO TRANSAÇÃO
            // =======================================================================================
                await conexao.beginTransaction() 

                  const sql = `
                    UPDATE usuarios SET 
                        otp_utilizado = 1
                    WHERE id_usuario = ?
                `

                const [resultado]: any = await this.pool.query(sql, [id_usuario]);

                 await conexao.commit();

                //             TRANSAÇÃO BEM SUCEDIDA COMMIT
                //==========================================================================================

                /** Libero a conexão após a transação ser concluida */
                conexao.release() 
                return resultado;

             } catch(erro){
                 await conexao.rollback();
                //  EM CASO DE ERRO - ROLLBACK
                // =====================================

                //console.log(erro)
                    /** Libero a conexão */
                conexao.release();
                return {erro: erro, mensagem: "Erro na operação do banco de dados."}
             }
        }
}