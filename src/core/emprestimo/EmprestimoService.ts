import { CriarEmprestimoDto } from "./dto/CriarEmprestimoDto";
import { Emprestimo } from "./Emprestimo";
import { EmprestimoRepositorio } from "./EmprestimoRepositorio";

export class EmprestimoService {
    constructor(readonly emprestimoRepositorio: EmprestimoRepositorio){}

    public async criarEmprestimo(criarEmprestimoDto: CriarEmprestimoDto) {


        //   Variáveis que vamos ter que adicionar:
        // BILL_AMT1-6 (fatura de cada mês)
        // PAY_AMT1-6 (pagamento de cada mês)
        // PAY_0, PAY_2, … PAY_6 (atraso em meses, feature mais importante)
        // PAY_AVG (Média de PAY_*)
        // UTIL_1-6
        // UTIL_AVG
        // TOTAL_PAY
        // PAYMENT_RATIO

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