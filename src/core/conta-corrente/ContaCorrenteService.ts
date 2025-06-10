import { ContaRepositorio } from "../conta/ContaRepositorio";
import { ContaCorrente } from "./ContaCorrente";
import { ContaCorrenteRepositorio } from "./ContaCorrenteRepositorio";
import { CriarContaCorrenteDto } from "./dto/CriarContaCorrenteDto";
import { SaqueDepositoDto } from "./dto/SaqueDepositoDto";

export class ContaCorrenteService {
    constructor(
        readonly contaCorrenteRepositorio: ContaCorrenteRepositorio,
        readonly contaRepositorio: ContaRepositorio
    ){}

    public async criarContaCorrente(criarContaCorrenteDto: CriarContaCorrenteDto) {

        try {

            const essaContaTemCadastro = await this.contaRepositorio.contaJaEstaSendoUsada(criarContaCorrenteDto.id_conta)

            if (!!essaContaTemCadastro[0]?.tipo_utilizacao) {
                if (essaContaTemCadastro[0]?.tipo_utilizacao?.toLowerCase() !== 'nenhuma') {
                    return {
                        erro: true,
                        mensagem: `Não é possivel criar um conta pois ela já está associada a uma conta ${essaContaTemCadastro[0]?.tipo_utilizacao}`,
                        codigo: 401
                    }
                }
            } else {
                return {
                    erro: true,
                    mensagem: `UUID de id_conta não existe`,
                    codigo: 404
                }
            }


            const contaCorrente = new ContaCorrente(
                criarContaCorrenteDto.id_conta,
                criarContaCorrenteDto.limite,
                criarContaCorrenteDto.data_vencimento,
                criarContaCorrenteDto.taxa_manutencao
            )

            const resposta = await this.contaCorrenteRepositorio.criarContaCorrente(contaCorrente)

            return resposta;

        } catch (erro) {
            return {
                erro: true,
                mensagem: `Erro ao criar conta corrente, erro inesperado`,
                codigo: 500
            }
        }


    }

    public async buscarTodasContaCorrentesPorCpf(id_usuario: string){
        const resposta = await this.contaCorrenteRepositorio.buscarTodasContaCorrentesPorCpf(id_usuario);
        return resposta;
    }

    public async buscarInformacoesDaContaCorrentePorId(id_conta_corrente: string){
        const resposta = await this.contaCorrenteRepositorio.buscarInformacoesDaContaCorrentePorId(id_conta_corrente);
        return resposta;
    }

    public async sacarSaldo(sacarSaldoDto: SaqueDepositoDto) {

        const contaCorrenteExiste = await this.contaCorrenteRepositorio.contaExiste(sacarSaldoDto.id_conta_corrente)
        const consultarSaldo = await this.contaCorrenteRepositorio.consultarSaldo(sacarSaldoDto.id_conta_corrente);

        try {
            if(parseFloat(consultarSaldo?.saldo) < sacarSaldoDto.valor){
                return {
                    erro: true,
                    mensagem: "Saldo insuficiente",
                    codigo: 403
                }
            }
        } catch (erro: any){
            return {
                erro: true,
                mensagem: "Erro ao validar saldo",
                codigo: 500
            }
        }

        

        if(!contaCorrenteExiste?.existe){
            return {
                erro: true,
                mensagem: `Conta corrente de id ${sacarSaldoDto.id_conta_corrente} não existe`,
                codigo: 404
            }
        }

        const resposta = await this.contaCorrenteRepositorio.sacarSaldo(sacarSaldoDto.id_conta_corrente, sacarSaldoDto.valor);
        return resposta;
    }

    public async depositar(saqueDepositoDto: SaqueDepositoDto) {
        const resposta = await this.contaCorrenteRepositorio.depositar(saqueDepositoDto.id_conta_corrente, saqueDepositoDto.valor)
        return resposta;
    }
}