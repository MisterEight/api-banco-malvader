import { ContaPoupanca } from "./ContaPoupanca";
import { ContaPoupancaRepositorio } from "./ContaPoupancaRepositorio";
import { CriarContaPoupancaDto } from "./dto/CriarContaPoupanca";

export class ContaPoupancaService {
    constructor(readonly contaPoupancaRepositorio: ContaPoupancaRepositorio){}

    public async criarContaPoupanca(criarContaPoupancaDto: CriarContaPoupancaDto){

        const contaPoupanca = new ContaPoupanca(
            criarContaPoupancaDto.id_conta,
            criarContaPoupancaDto.taxa_rendimento,
            criarContaPoupancaDto.ultimo_rendimento
        )
        const resposta = await this.contaPoupancaRepositorio.criarContaPoupanca(contaPoupanca)

        return resposta;
    }
}