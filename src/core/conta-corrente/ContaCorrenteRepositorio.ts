import { Pool, ResultSetHeader } from "mysql2/promise";
import { CriarContaCorrenteDto } from "./dto/CriarContaCorrenteDto";
import { ContaCorrente } from "./ContaCorrente";
import { tratarCodigosDeErroSql } from "../../utils/tratamentoDeErrosSql";

export class ContaCorrenteRepositorio {
    constructor(readonly pool: Pool) { }

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

            return { id_conta_corrente: contaCorrente.getIdContaCorrente() };

        } catch (erro: any) {
            conexao.rollback()
            conexao.release()

            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                return erroTratado;
            }

            return {
                erro: true,
                mensagem: `Erro ao criar conta corrente ${erro}`,
                codigo: 500
            }
        }
    }

    public async buscarTodasContaCorrentesPorCpf(id_usuario: string): Promise<any> {

        const sql = `
            SELECT cc.id_conta_corrente
            FROM contas_corrente cc
            LEFT OUTER JOIN conta ct
                ON ct.id_conta = cc.id_conta
            LEFT OUTER JOIN clientes cli 
                ON ct.id_cliente = cli.id_cliente
            LEFT OUTER JOIN usuarios us
                ON us.id_usuario = cli.id_usuario
            WHERE us.cpf = ?
        `

        try {

            const [resultado]: any = await this.pool.query<ResultSetHeader>(sql, [id_usuario])
            return resultado

        } catch (erro: any) {
            return {
                erro: true,
                mensagem: "Erro ao consultar conta corrente",
                codigo: 500
            }
        }

    }

    public async buscarInformacoesDaContaCorrentePorId(id_conta_corrente: string): Promise<any> {
        const sql = `
            SELECT 
	            ct.numero_conta,
                ct.saldo,
                cc.limite,
                ag.codigo_agencia
            FROM contas_corrente as cc
            LEFT OUTER JOIN conta as ct
                ON ct.id_conta = cc.id_conta
            LEFT OUTER JOIN agencia as ag
                ON ag.id_agencia = ct.id_agencia
            WHERE cc.id_conta_corrente = ?
                
        `

        try {
            const [resultado]: any = await this.pool.query<ResultSetHeader>(sql, [id_conta_corrente]);

            return resultado[0];
        } catch(erro: any){

        }
    }

    public async sacarSaldo(id_conta_corrente: string, valor: number): Promise<any> {
      
        const sql = `
            UPDATE conta AS ct
            LEFT OUTER JOIN contas_corrente AS cc
                ON ct.id_conta = cc.id_conta
            SET ct.saldo = ct.saldo - ?
            WHERE cc.id_conta_corrente = ?;
        `

        const conexao = await this.pool.getConnection();

        try{
            conexao.beginTransaction();

            const [resultado] = await conexao.query<ResultSetHeader>(sql, [valor, id_conta_corrente]);

            // console.log(resultado)

            conexao.commit();
            conexao.release();

            return {
                mensagem: `Saque no valor de R$${valor} realizado com sucesso.`
            }
        } catch (erro: any){
            conexao.rollback();
            conexao.release();

            const erroTratado = tratarCodigosDeErroSql(erro);
            if (erroTratado !== false) {
                    return erroTratado;
            }

            return {
                erro: true,
                mensagem: "Erro ao sacar saldo da conta",
                codigo: 500
            }
        }
    }

    public async consultarSaldo(id_conta_corrente: string): Promise<any> {
        const sql = `
            SELECT 
                ct.saldo
            FROM conta as ct
            LEFT OUTER JOIN contas_corrente as cc
                ON cc.id_conta = ct.id_conta
            WHERE cc.id_conta_corrente = ? 
        `

        try{
            const [resultado]: any = await this.pool.query<ResultSetHeader>(sql, [id_conta_corrente])
            return resultado[0];
        } catch(erro: any){
            return {
                erro: true,
                mensagem: "Erro ao consultar saldo"
            }
        }
    }
    public async contaExiste(id_conta_corrente: string): Promise<any> {
        const sql = `
            SELECT
                CASE WHEN COUNT(id_conta_corrente) > 0 THEN true ELSE false END as existe
            FROM contas_corrente
            WHERE id_conta_corrente = ?
        `

        try {
            const [resultado]: any = await this.pool.query<ResultSetHeader>(sql, [id_conta_corrente])

            return resultado[0]
        } catch (erro: any){
            throw Error("Erro ao buscar ao verificar existência da conta corrente")
        }
    }

    public async depositar(id_conta_corrente: string, valor: number): Promise<any> {
        const sql = `
            UPDATE conta as ct
            LEFT OUTER JOIN contas_corrente as cc
                ON ct.id_conta = cc.id_conta
            SET ct.saldo = saldo + ?
            WHERE cc.id_conta_corrente = ?
        `

        const conexao = await this.pool.getConnection()

        try {
            conexao.beginTransaction()

            const [resultado]: any = await conexao.query<ResultSetHeader>(sql, [valor, id_conta_corrente])

            conexao.commit();
            conexao.release();

            return {mensagem: `Deposito no valor de R$${valor} realizado com sucesso!`}

        } catch(erro: any){
            conexao.rollback();
            conexao.release();
            return {
                erro: true,
                mensagem: "Erro ao depositar saldo",
                codigo: 500
            }
        }
    }
}