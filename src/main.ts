import express from 'express';
import dotenv from 'dotenv'
import {inicializarBanco} from './config/database';
import cors from 'cors'

// Buscamos o endereço de ip do .env, como ts é fortemente tipado, dizemos que ele é do tipo string e 'convertemos' o que vem do .env para string
const IP: string = String(process.env.API_IP);
// Buscamos o endereço de ip do .env, como ts é fortemente tipado, dizemos que ele é do tipo number e 'convertemos' o que vem do .env para number
const PORT: number = Number(process.env.API_PORT);

const app = express();
app.use(express.json());
app.use(cors());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor" });
});

// Importando as rotas
import usuarioRoutes from './core/usuario/usuario.routes';
app.use('/usuario', usuarioRoutes);

import authUsuarioRoutes from './auth/auth-usuario/auth-usuario.routes'
app.use('/auth/usuario', authUsuarioRoutes)

import funcionarioRoutes from './core/funcionario/funcionario.routes';
app.use('/funcionario', funcionarioRoutes)

import clienteRoutes from './core/cliente/cliente.routes'
app.use('/cliente', clienteRoutes)

import enderecoAgenciaRoutes from './core/endereco-agencia/endereco.routes'
app.use('/endereco-agencia', enderecoAgenciaRoutes)

import agenciaRoutes from './core/agencia/agencia.routes'
app.use('/agencia', agenciaRoutes)

import contaRoutes from './core/conta/conta.routes';
app.use('/conta', contaRoutes);

import contaCorrenteRoutes from './core/conta-corrente/conta-corrente.routes';
app.use('/conta-corrente', contaCorrenteRoutes);

import contaPoupancaRoutes from './core/conta-poupanca/conta-poupanca.routes'
app.use('/conta-poupanca', contaPoupancaRoutes);

import contaInvestimentoRoutes from './core/conta-investimento/conta-investimento.routes'
app.use('/conta-investimento', contaInvestimentoRoutes)

import transacaoRoutes from './core/transacao/transacao.routes';
app.use('/transacao', transacaoRoutes)

import emprestimoRoutes from './core/emprestimo/emprestimo.routes'
app.use('/emprestimo', emprestimoRoutes)

import relatorioRoutes from './core/relatorio/relatorio.routes'
app.use('/relatorio', relatorioRoutes)

inicializarBanco().then(()=> {
    app.listen(PORT, IP,  ()=> {
        console.log(`😎 API está rodando no endereço: http://${IP}:${PORT}`);
    })  
})
