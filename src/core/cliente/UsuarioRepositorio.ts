import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Usuario } from './Usuario';
import { Erro } from '../../utils/interfaces/respostas';
import { BuscarUsuarioCpf } from './dto/BuscaPorCpf.dto';

export class UsuarioRepositorio {
  constructor(private readonly pool: Pool) {}

  public async criar(usuario: Usuario): Promise<any | Erro> {
    const conexao = await this.pool.getConnection();

    try {
      await conexao.beginTransaction();

      const sql = `INSERT INTO usuarios SET ?`;
      const [resultado] = await conexao.query<ResultSetHeader>(sql, usuario.dadosTratados());

      await conexao.commit();
      conexao.release();

      return resultado;

    } catch (erro) {
      await conexao.rollback();
      conexao.release();
      return { erro, mensagem: "Erro na operação do banco de dados." };
    }
  }

  public async buscarUsuarioPorCpf(params: BuscarUsuarioCpf): Promise<any> {
    const sql = `
      SELECT id_usuario, nome, cpf, telefone 
      FROM usuarios WHERE cpf = ?;
    `;
    const [resultado]: any = await this.pool.query(sql, [params.cpf]);
    return resultado[0];
  }

  public async buscarUsuarioPorId(id: number): Promise<any> {
    const sql = `
      SELECT id_usuario, nome, cpf, telefone 
      FROM usuarios WHERE id_usuario = ?;
    `;
    const [resultado]: any = await this.pool.query(sql, [id]);
    return resultado[0];
  }

  public async verificaSeUsuarioExisteBoolean(cpf: string): Promise<boolean> {
    const sql = `SELECT COUNT(cpf) as total FROM usuarios WHERE cpf = ?;`;
    const [resultado]: any = await this.pool.query(sql, [cpf]);
    return resultado[0]?.total > 0;
  }
}
