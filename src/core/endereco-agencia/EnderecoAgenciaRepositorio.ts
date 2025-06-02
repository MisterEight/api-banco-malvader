import { Pool, ResultSetHeader } from "mysql2/promise";
import { EnderecoAgenciaService } from "./EnderecoAgenciaService";
import { EnderecoAgencia } from "./EnderecoAgencia";

export class EnderecoAgenciaRepositorio {
    constructor(readonly pool: Pool){}

    public async criarEnderecoAgencia(enderecoAgencia: EnderecoAgencia): Promise<any> {
        const sql = `
            INSERT INTO endereco_agencia (
                id_endereco,
                id_agencia,
                cep,
                local,
                numero_casa,
                bairro,
                cidade,
                estado,
                complemento
            ) VALUES (?, ?, ?, ?, ?, ?, ? , ? , ?)
        `;

        const conexao = await this.pool.getConnection()

        try {
            conexao.beginTransaction()

            const [resultado] = await this.pool.query<ResultSetHeader>(sql, [
                enderecoAgencia.getIdEndereco(),
                enderecoAgencia.getIdAgencia(),
                enderecoAgencia.getCep(),
                enderecoAgencia.getLocal(),
                enderecoAgencia.getNumeroCasa(),
                enderecoAgencia.getBairro(),
                enderecoAgencia.getCidade(),
                enderecoAgencia.getEstado(),
                enderecoAgencia.getComplemento()
            ])

            conexao.commit()
            conexao.release()

            return {id_endereco: enderecoAgencia.getIdEndereco()};
        } catch (erro: any){
            conexao.rollback()
            conexao.release()

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
                mensagem: "Erro ao inserir endereço de agência",
                codigo: 500
            }
        }
    }

}   