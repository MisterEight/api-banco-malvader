import { Pool, ResultSetHeader } from "mysql2/promise";
import { CriarContaCorrenteDto } from "./dto/CriarContaCorrente";
import { ContaCorrente } from "./ContaCorrente";

export class ContaCorrenteRepositorio {
    constructor(readonly pool: Pool){}

    public async criarContaCorrente(contaCorrente: ContaCorrente): Promise<any> {
        const sql = `
            INSERT INTO contas_corrente (
                id_conta_corrente,
                id_conta,
                limite,
                data_vencimento,
                taxa_manutencao
            ) VALUES (?, ?, ?, ?, ?)
        `

        const conexao = await this.pool.getConnection()

        try {
            conexao.beginTransaction()

            const [resposta]: any = await this.pool.query<ResultSetHeader>(sql, [
                contaCorrente.getIdContaCorrente(),
                contaCorrente.getIdConta(),
                contaCorrente.getLimite(),
                contaCorrente.getDataVencimento(),
                contaCorrente.getTaxaManutencao()
            ])

            conexao.commit()
            conexao.release()

            return resposta;

        } catch (erro: any){
            conexao.rollback()
            conexao.release()

            return {
                erro: true,
                mensagem: "Erro ao criar conta corrente",
                codigo: 500
            }
        }
    }
}