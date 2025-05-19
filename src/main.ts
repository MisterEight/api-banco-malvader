import express from 'express';
import dotenv from 'dotenv'
import {inicializarBanco} from './config/database'


// Buscamos o endereço de ip do .env, como ts é fortemente tipado, dizemos que ele é do tipo string e 'convertemos' o que vem do .env para string
const IP: string = String(process.env.API_IP);
// Buscamos o endereço de ip do .env, como ts é fortemente tipado, dizemos que ele é do tipo number e 'convertemos' o que vem do .env para number
const PORT: number = Number(process.env.API_PORT);

const app = express();
app.use(express.json())

// Importando as rotas
import usuarioRoutes from './core/cliente/usuario.routes';
app.use('/usuario', usuarioRoutes);



inicializarBanco().then(()=> {
    app.listen(PORT, IP,  ()=> {
        console.log(`😎 API está rodando no endereço: http://${IP}:${PORT}`);
    })  
})
