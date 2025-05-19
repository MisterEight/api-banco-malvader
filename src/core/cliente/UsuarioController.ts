import { Usuario } from "./Usuario";
import { UsuarioRepositorio } from "./UsuarioRepositorio";
import { pool } from "../../config/database"
import { Response, Request } from "express";

export class UsuarioController {
    private usuarioRepositorio: UsuarioRepositorio;

    constructor() {
        this.usuarioRepositorio = new UsuarioRepositorio(pool);
    }

    // Controller para criar o usuarios
    public async criarUsuario(req: Request, res: Response) {
        try {
            const corpo = req.body;
            const usuario = new Usuario(corpo);
            const novoUsuario = await this.usuarioRepositorio.criar(usuario);
            return res.status(201).json(novoUsuario);
        } catch (erro: any) {
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    }

    // Controller para buscar o usuarios por CPF
    public async buscarUsuarioPorCpfController(req: Request, res: Response) {
        try {
            const { cpf } = req.params;
            const usuario = await this.usuarioRepositorio.buscarUsuarioPorCpf(cpf);

            if (!usuario || usuario.length === 0) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            return res.status(200).json(usuario);
        } catch (erro: any) {
            console.error("Erro ao buscar por CPF:", erro.message);
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    }

}

