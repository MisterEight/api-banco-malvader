import { ContaRepositorio } from "../conta/ContaRepositorio";
import { ContaInvestimento } from "./ContaInvestimento";
import { ContaInvestimentoRepositorio } from "./ContaInvestimentoRepositorio";
import { CriarContaInvestimentoDto } from "./dto/CriarContaInvestimento";

export class ContaInvestimentoService {
    constructor(
        readonly contaInvestimentoRepositorio: ContaInvestimentoRepositorio,
        readonly contaRepositorio: ContaRepositorio
    ) { }

    public async criarContaInvestimento(criarContaInvestimentoDto: CriarContaInvestimentoDto) {

        try {
            const essaContaTemCadastro = await this.contaRepositorio.contaJaEstaSendoUsada(criarContaInvestimentoDto.id_conta)

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

            const contaInvestimento = new ContaInvestimento(
                criarContaInvestimentoDto.id_conta,
                criarContaInvestimentoDto.perfil_risco,
                criarContaInvestimentoDto.valor_minimo,
                criarContaInvestimentoDto.taxa_rendimento_base
            )
            const resultado = await this.contaInvestimentoRepositorio.criarContaInvestimento(contaInvestimento);

            return resultado;
        } catch (erro: any) {
            return {
                erro: true,
                mensagem: "Erro ao criar conta investimento, erro inesperado!",
                codigo: 500
            }
        }


    }
}