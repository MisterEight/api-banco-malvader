import { Pool, ResultSetHeader } from "mysql2/promise";
import { CriarUsuarioDto } from "../cliente/dto/CriarUsuario.dto";
import { CriarFuncionarioDto } from "./dto/CriarFuncionario.dto";
import { Funcionario } from "./Funcionario";

export class FuncionarioRepositorio {
    constructor(private readonly pool: Pool){}

    public async criarFuncionario(funcionario: Funcionario){
        const conexao = await this.pool.getConnection();

        const sql = `
            call inserir_funcionario(?, ?, ?);
        `
        
        try {
            await conexao.beginTransaction();
            const [resultado] = await conexao.query<ResultSetHeader>(sql, [funcionario.dadosParaInserir().nome, funcionario.dadosParaInserir().cargo, funcionario.dadosParaInserir().id_supervisor]);

            await conexao.commit();
            conexao.release();

            return resultado;
            
        } catch(erro){
            conexao.rollback()
            conexao.release()
            return {erro: erro, mensagem: 'Erro ao inserir funcionário!'}
        }
    }
}