import { ContaRepositorio } from "../conta/ContaRepositorio";
import { CriarTransacaoDTO } from "./dto/CriarTransacaoDto";
import { ContaBuscaPorId, InformacoesConta } from "./interfaces/insterfaces";
import { Transacao } from "./Transacao";
import { TransacaoRepositorio } from "./TransacaoRepositorio";

export class TransacaoService {
    constructor(
        readonly transacaoRepositorio: TransacaoRepositorio,
        readonly contaRepositorio: ContaRepositorio
    ){}

    public async inserirTransacao(criarTransacaoDto: CriarTransacaoDTO){

       

        try {

            const usuarioConta = await this.transacaoRepositorio.retornarIdContaDoIdOrigem(criarTransacaoDto?.id_conta_origem)

            if(!usuarioConta?.id_conta){
                return {
                    erro: true,
                    mensagem: "Conta de origem não encontrada",
                    codigo: 404
                }
            }

            let contaOrigem: ContaBuscaPorId;
            let informacoesContaOrigem: InformacoesConta;
            try {
                contaOrigem = await this.contaRepositorio.buscarContaPorId(usuarioConta?.id_conta)
                informacoesContaOrigem = await this.contaRepositorio.buscarInfomacoesDoUsuarioPelaConta(usuarioConta?.id_conta);
            } catch (erro) {
                return {
                    erro: true,
                    mensagem: "Erro ao buscar conta de origem",
                    codigo: 500
                }
            }
            
            let contaDestino: ContaBuscaPorId;
            let informacoesContaDestino;
            try {
                contaDestino = await this.contaRepositorio.buscarContaPorId(criarTransacaoDto.id_conta_destino)
                informacoesContaDestino = await this.contaRepositorio.buscarInfomacoesDoUsuarioPelaConta(criarTransacaoDto.id_conta_destino);
            } catch (erro) {
                return {
                    erro: true,
                    mensagem: "Erro ao buscar conta de destino",
                    codigo: 500
                }
            }

            if (!contaOrigem?.id_conta) {
                return {
                    erro: true,
                    mensagem: "Conta de origem não encontrada.",
                    codigo: 403
                }
            }
            if (!contaDestino?.id_conta) {
                return {
                    erro: true,
                    mensagem: "Conta de destino não encontrada.",
                    codigo: 403
                }
            }

            if(String(contaOrigem.tipo_conta) !== String(contaDestino.tipo_conta)){
                return {
                    erro: true,
                    mensagem: "Transacoes entre diferentes tipos de conta não é permitido.",
                    codigo: 403
                }
            }

            if(contaOrigem.id_conta === contaDestino.id_conta){
                return {
                    erro: true,
                    mensagem: "Transações para a mesma conta, não são permitidas.",
                    codigo: 403
                }
            }

            if(contaOrigem.saldo < criarTransacaoDto.valor){
                return {
                    erro: true,
                    mensagem: "Você não tem saldo suficiente.",
                    codigo: 403
                }
            }

            const transacao = new Transacao(
                usuarioConta?.id_conta,
                criarTransacaoDto.id_conta_destino,
                criarTransacaoDto.tipo_transacao,
                criarTransacaoDto.valor,
                criarTransacaoDto.data_hora,
                criarTransacaoDto.descricao
            )

            const resultado = await this.transacaoRepositorio.inserirTransacao(transacao);

            if(resultado.erro){
                return {
                    erro: true,
                    mensagem: resultado.mensagem,
                    codigo: 500
                }
            }

            return {resultado: `${criarTransacaoDto.tipo_transacao} no valor de R$ ${criarTransacaoDto.valor} realizada com sucesso de ${informacoesContaOrigem.nome} para ${informacoesContaDestino.nome}`}
        } catch(erro: any){
            console.log(erro)
            return {
                erro: true,
                mensagem: "Erro ao inserir transacao",
                codigo: 500
            }
        }
  
    }
}
