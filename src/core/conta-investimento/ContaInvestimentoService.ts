import { ContaInvestimento } from "./ContaInvestimento";
import { ContaInvestimentoRepositorio } from "./ContaInvestimentoRepositorio";
import { CriarContaInvestimentoDto } from "./dto/CriarContaInvestimento";

export class ContaInvestimentoService {
    constructor(readonly contaInvestimentoRepositorio: ContaInvestimentoRepositorio){}

    public async criarContaInvestimento(criarContaInvestimentoDto: CriarContaInvestimentoDto) {
        const contaInvestimento = new ContaInvestimento(
            criarContaInvestimentoDto.id_conta,
            criarContaInvestimentoDto.perfil_risco,
            criarContaInvestimentoDto.valor_minimo,
            criarContaInvestimentoDto.taxa_rendimento_base
        )
        const resultado = await this.contaInvestimentoRepositorio.criarContaInvestimento(contaInvestimento);

        return resultado;
    }
}