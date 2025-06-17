import { Conta } from "./Conta";
import { ContaRepositorio } from "./ContaRepositorio";
import { CriarContaDTO } from "./dto/CriarContaDto";

export class ContaService {
    constructor(readonly contaRepositorio: ContaRepositorio) { }

    public async criarConta(criarContaDTO: CriarContaDTO) {

        try {
            const tipoDeContaJaExiste = await this.contaRepositorio.tipoDeContaJaExiste(criarContaDTO.id_cliente, criarContaDTO.tipo_conta)
            if (tipoDeContaJaExiste.existe > 0) {
                return {
                    erro: true,
                    mensagem: `O tipo de conta ${criarContaDTO.tipo_conta} já existe para esse cliente`,
                    codigo: 403
                }
            }

            const conta = new Conta(
                criarContaDTO.id_agencia,
                criarContaDTO.saldo,
                criarContaDTO.id_cliente,
                criarContaDTO.data_abertura,
                criarContaDTO.status,
                criarContaDTO.tipo_conta
            )
            const resposta = await this.contaRepositorio.criarConta(conta)

            return resposta;
        } catch (erro) {
            return {
                erro: true,
                mensagem: "Erro inesperado ao criar conta",
                codigo: 500
            }
        }

    }

    public async atualizarConta(contaDto: CriarContaDTO & { id_conta: string }) {
        try {
            const conta = new Conta(
                contaDto.id_agencia,
                contaDto.saldo,
                contaDto.id_cliente,
                contaDto.data_abertura,
                contaDto.status,
                contaDto.tipo_conta
            );

            // Força o id original
            (conta as any).id_conta = contaDto.id_conta;
            const resposta = await this.contaRepositorio.atualizarConta(conta);
            return resposta;
        } catch (erro) {
            return {
                erro: true,
                mensagem: 'Erro inesperado ao atualizar conta',
                codigo: 500
            }
        }
    }

    public async deletarConta(id_conta: string) {
        try {
            const resposta = await this.contaRepositorio.deletarConta(id_conta);
            return resposta;
        } catch (erro) {
            return {
                erro: true,
                mensagem: 'Erro inesperado ao deletar conta',
                codigo: 500
            }
        }
    }

    public async buscarContaPorId(id_conta: string) {
        try {
            const resposta = await this.contaRepositorio.buscarContaPorId(id_conta);
            return resposta;
        } catch (erro) {
            return {
                erro: true,
                mensagem: 'Erro ao buscar conta',
                codigo: 500
            }
        }
    }
}