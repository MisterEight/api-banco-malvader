import { Pool, ResultSetHeader } from 'mysql2/promise';
import { LoginUsuarioDTO } from './dto/LoginUsuario.dto';

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
            // Parou aqui
        }
}