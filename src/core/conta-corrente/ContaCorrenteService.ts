import { ContaRepositorio } from "../conta/ContaRepositorio";
import { ContaCorrente } from "./ContaCorrente";
import { ContaCorrenteRepositorio } from "./ContaCorrenteRepositorio";
import { CriarContaCorrenteDto } from "./dto/CriarContaCorrente";

export class ContaCorrenteService {
    constructor(
        readonly contaCorrenteRepositorio: ContaCorrenteRepositorio
    ){}

    public async criarContaCorrente(criarContaCorrenteDto: CriarContaCorrenteDto){
        const contaCorrente = new ContaCorrente(
            criarContaCorrenteDto.id_conta,
            criarContaCorrenteDto.limite,
            criarContaCorrenteDto.data_vencimento,
            criarContaCorrenteDto.taxa_manutencao
        )

        const resposta = await this.contaCorrenteRepositorio.criarContaCorrente(contaCorrente)

        return resposta;
    }
}