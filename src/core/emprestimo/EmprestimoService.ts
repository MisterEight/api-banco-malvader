import { CriarEmprestimoDto } from "./dto/CriarEmprestimoDto";
import { Emprestimo } from "./Emprestimo";
import { EmprestimoRepositorio } from "./EmprestimoRepositorio";

export class EmprestimoService {
    constructor(readonly emprestimoRepositorio: EmprestimoRepositorio){}

    public async criarEmprestimo(criarEmprestimoDto: CriarEmprestimoDto) {

        const emprestimo = new Emprestimo(
            criarEmprestimoDto.id_conta,
            criarEmprestimoDto.valor_solicitado,
            criarEmprestimoDto.taxa_juros_mensal,
            criarEmprestimoDto.prazo_meses
        )

        const resposta = await this.emprestimoRepositorio.criarEmprestimo(emprestimo);

        return resposta
    }
}