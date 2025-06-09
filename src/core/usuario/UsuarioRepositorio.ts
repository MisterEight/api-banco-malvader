import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Usuario } from './Usuario';
import { Erro } from '../../utils/interfaces/respostas';
import { BuscarUsuarioCpf } from './dto/BuscaPorCpf.dto';
import { tratarCodigosDeErroSql } from '../../utils/tratamentoDeErrosSql';

export class UsuarioRepositorio {
  constructor(private readonly pool: Pool) {}

  public async criar(usuario: Usuario): Promise<any | Erro> {
    const conexao = await this.pool.getConnection();

    try {
      await conexao.beginTransaction();


      const dadosTratados = usuario.dadosTratados()

      const sql = `INSERT INTO usuarios SET ? `;
      const [resultado] = await conexao.query<ResultSetHeader>(sql, dadosTratados);

      console.log(resultado)
      await conexao.commit();
      conexao.release();

      resultado.insertId = await dadosTratados.id_usuario;

      return resultado;

    } catch (erro) {
      await conexao.rollback();
      conexao.release();

      const erroTratado = tratarCodigosDeErroSql(erro);
      if (erroTratado !== false) {
        return erroTratado;
      }

      return { erro, mensagem: "Erro na operação do banco de dados." };
    }
  }

  public async buscarUsuarioPorCpf(params: BuscarUsuarioCpf): Promise<any> {
    try {
      const sql = `
      SELECT id_usuario, nome, cpf, telefone 
      FROM usuarios WHERE cpf = ?;
    `;
      const [resultado]: any = await this.pool.query(sql, [params.cpf]);

      return resultado[0];
    } catch (erro: any) {
      return {
        erro: true,
        mensagem: "Erro ao buscar usuário",
        codigo: 500
      }
    }

  }

  // Para uso interno
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
