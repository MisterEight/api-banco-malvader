import { ContaRepositorio } from "../conta/ContaRepositorio";
import { ContaPoupanca } from "./ContaPoupanca";
import { ContaPoupancaRepositorio } from "./ContaPoupancaRepositorio";
import { CriarContaPoupancaDto } from "./dto/CriarContaPoupanca";

export class ContaPoupancaService {
    constructor(
        readonly contaPoupancaRepositorio: ContaPoupancaRepositorio,
        readonly contaRepositorio: ContaRepositorio
    ) { }

    public async criarContaPoupanca(criarContaPoupancaDto: CriarContaPoupancaDto) {

        try {
            const essaContaTemCadastro = await this.contaRepositorio.contaJaEstaSendoUsada(criarContaPoupancaDto.id_conta)

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

            const contaPoupanca = new ContaPoupanca(
                criarContaPoupancaDto.id_conta,
                criarContaPoupancaDto.taxa_rendimento,
                criarContaPoupancaDto.ultimo_rendimento
            )
            const resposta = await this.contaPoupancaRepositorio.criarContaPoupanca(contaPoupanca)

            return resposta;
        } catch (erro: any) {
            return {
                erro: true,
                mensagem: "Erro ao criar conta poupanca, erro inesperado",
                codigo: 500
            }
        }


    }
}