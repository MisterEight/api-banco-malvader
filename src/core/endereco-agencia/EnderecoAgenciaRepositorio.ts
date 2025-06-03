import { Pool, ResultSetHeader } from "mysql2/promise";
import { EnderecoAgenciaService } from "./EnderecoAgenciaService";
import { EnderecoAgencia } from "./EnderecoAgencia";
import { tratarCodigosDeErroSql } from "../../utils/tratamentoDeErrosSql";

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

            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                return erroTratado;
            }

            return {
                erro: true,
                mensagem: "Erro ao inserir endereço de agência",
                codigo: 500
            }
        }
    }

}   