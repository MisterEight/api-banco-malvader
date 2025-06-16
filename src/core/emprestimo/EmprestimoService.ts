import { CriarEmprestimoDto } from "./dto/CriarEmprestimoDto";
import { Emprestimo } from "./Emprestimo";
import { EmprestimoRepositorio } from "./EmprestimoRepositorio";
import { analisarEmprestimo } from "../../ml/analiseEmprestimo";

export class EmprestimoService {
    constructor(readonly emprestimoRepositorio: EmprestimoRepositorio){}

    public async criarEmprestimo(criarEmprestimoDto: CriarEmprestimoDto) {
        try {
            const analise = await analisarEmprestimo({
                limit_bal: criarEmprestimoDto.limit_bal,
                bill_avg: criarEmprestimoDto.bill_avg,
                pay_avg: criarEmprestimoDto.pay_avg,
                util_avg: criarEmprestimoDto.util_avg,
                total_pay: criarEmprestimoDto.total_pay,
                payment_ratio: criarEmprestimoDto.payment_ratio,
            })

            const scoreRisco = 100 - analise.score
            const status = analise.approved ? 'APROVADO' : 'REJEITADO'

            let taxa = 0
            if (scoreRisco <= 20) taxa = 0.5
            else if (scoreRisco <= 40) taxa = 1.0
            else if (scoreRisco <= 60) taxa = 2.0
            else if (scoreRisco <= 80) taxa = 3.5
            else taxa = 5.0

            const emprestimo = new Emprestimo(
                criarEmprestimoDto.id_conta,
                criarEmprestimoDto.valor_solicitado,
                taxa,
                criarEmprestimoDto.prazo_meses,
                status,
                scoreRisco
            )

            const resposta = await this.emprestimoRepositorio.criarEmprestimo(emprestimo)

            return { ...resposta, status, score_risco: scoreRisco }
        } catch (erro) {
            return {
                erro: true,
                mensagem: 'Erro ao processar empréstimo',
                codigo: 500
            }
        }
    }
}