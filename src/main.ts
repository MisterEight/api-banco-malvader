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
import usuarioRoutes from './core/cliente/usuario.routes';
app.use('/usuario', usuarioRoutes);

import authUsuarioRoutes from './auth/auth-usuario/auth-usuario.routes'
app.use('/auth/usuario', authUsuarioRoutes)

import funcionarioRoutes from './core/funcionario/usuario.routes';
app.use('/funcionario', funcionarioRoutes)

inicializarBanco().then(()=> {
    app.listen(PORT, IP,  ()=> {
        console.log(`😎 API está rodando no endereço: http://${IP}:${PORT}`);
    })  
})
