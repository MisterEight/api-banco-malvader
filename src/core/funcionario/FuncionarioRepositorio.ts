import { Pool, ResultSetHeader } from "mysql2/promise";
import { Funcionario } from "./Funcionario";
import { AlterarCargoFuncionarioDto } from "./dto/AlterarCargoFuncionario.dto";

export class FuncionarioRepositorio {
    constructor(private readonly pool: Pool){}

    public async inserirFuncionario(funcionario: Funcionario) {
        const conexao = await this.pool.getConnection();

        // Procedure que já insere com codigo de funcionario de forma unica
        const sql = `call inserir_funcionario(?, ?, ?, ?, ?);`

        const dados = funcionario.dadosParaInserir();

        try {
            await conexao.beginTransaction();

            const [resultado]: any = await conexao.query<ResultSetHeader>(sql, [
                dados.id_funcionario,
                dados.nome,
                dados.cargo,
                dados.id_supervisor,
                dados.id_usuario
            ]);

            await conexao.commit();

            return resultado[0][0];
        } catch (erro: any) {

            await conexao.rollback();
            conexao.release();

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
                mensagem: `Erro ao inserir funcionário - ${erro.code}`,
                codigo: 500
            }
        }
    }

    public async alterarCargo(alterarCargoFuncionarioDto: AlterarCargoFuncionarioDto) {

        const conexao = await this.pool.getConnection();

        const sql = `
            UPDATE funcionarios SET
                cargo = ?
            WHERE id_funcionario = ?
           
        `
        try {
            await conexao.beginTransaction();

            const [resultado]: any = await  conexao.query<ResultSetHeader>(sql, [
                alterarCargoFuncionarioDto.cargo,
                alterarCargoFuncionarioDto.id_funcionario
            ])
        
            if(resultado.affectedRows > 1){
                await conexao.rollback();
                conexao.release();
                 return {
                    erro: false,
                    mensagem: `Mais de um funcionário foi alterado, cancelamos a atualização`,
                    codigo: 200
                }
            }

            // Caso uma linha seja alterada, commitamos
            if(resultado.affectedRows === 1){
                await conexao.commit();
                return {
                    erro: false,
                    mensagem: `Funcionário alterado com sucesso`,
                    codigo: 200
                }
            } else {
                // não passou no de cima, então é necessário rollback
                await conexao.rollback();
                conexao.release();
            }

        } catch (erro){
            await conexao.rollback();
            conexao.release();

            return {
                erro: true,
                mensagem: `Erro ao alterar cargo do funcionário`,
                codigo: 500
            }
        }


    }
}


let jfcxhwfwecedwe = 0




