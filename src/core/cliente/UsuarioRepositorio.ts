import { Pool } from 'mysql2/promise';
import { Usuario } from './Usuario';

export class UsuarioRepositorio {
    private pool: Pool;
    
    constructor(pool: Pool) {
        this.pool = pool;
    }

    public async criar(usuario: Usuario): Promise<any> {
        
        // Verifica se o CPF já existe - HÁ FAZER ❌
        const sql = 'INSERT INTO usuarios SET ?';
        const [resultado] = await this.pool.query(sql, {
            nome: usuario.nome,
            cpf: usuario.cpf,
            data_nascimento: usuario.data_nascimento,
            tipo_usuario: usuario.tipo_usuario,
            telefone: usuario.telefone,
            senha_hash: usuario.senha_hash,
            otp_ativo: usuario.otp_ativo,
            otp_expiracao: usuario.otp_expiracao
        });
        return resultado;
    }
    
    public async buscarUsuarioPorCpf(cpf: string): Promise<any> {
        console.log(cpf)
        
        const query = {
            sql: `
                SELECT
                    id_usuario,
                    nome,
                    cpf,
                    telefone 
                FROM usuarios WHERE cpf = ?;
            `
        }
        const [resultado] = await this.pool.query(query.sql, [cpf]);


        console.log(resultado)
        return resultado;
    }
}