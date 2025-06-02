import { Conta } from "./Conta";
import { ContaRepositorio } from "./ContaRepositorio";
import { CriarContaDTO } from "./dto/CriarContaDto";

export class ContaService {
    constructor(readonly contaRepositorio: ContaRepositorio){}

    public async criarConta(criarContaDTO: CriarContaDTO) {
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
    }
}