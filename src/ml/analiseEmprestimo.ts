import dotenv from 'dotenv'

dotenv.config()

export interface AnaliseEmprestimoPayload {
    limit_bal: number
    bill_avg: number
    pay_avg: number
    util_avg: number
    total_pay: number
    payment_ratio: number
}

export interface AnaliseEmprestimoResposta {
    prob_default: number
    score: number
    approved: boolean
}

const ML_URL = (process.env.ML_API_URL || 'http://localhost:5000') + '/analisa_emprestimo'

export async function analisarEmprestimo(payload: AnaliseEmprestimoPayload): Promise<AnaliseEmprestimoResposta> {
    const resposta = await fetch(ML_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            LIMIT_BAL: payload.limit_bal,
            BILL_AVG: payload.bill_avg,
            PAY_AVG: payload.pay_avg,
            UTIL_AVG: payload.util_avg,
            TOTAL_PAY: payload.total_pay,
            PAYMENT_RATIO: payload.payment_ratio,
        })
    })

    if (!resposta.ok) {
        throw new Error(`Falha ao conectar na API de ML: ${resposta.status}`)
    }

    return resposta.json() as Promise<AnaliseEmprestimoResposta>
}
