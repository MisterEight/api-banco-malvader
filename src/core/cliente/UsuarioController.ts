import { Usuario } from "./Usuario";
import { UsuarioRepositorio } from "./UsuarioRepositorio";
import { pool } from "../../config/database"
import { Response, Request } from "express";
import { UsuarioService } from "./UsuarioService";
import { Erro } from "../../utils/interfaces/respostas";
import { CriarUsuarioDto } from "./dto/CriarUsuario.dto";
import { validarDto } from "../../middlewares/validar-dto";
import { plainToInstance } from "class-transformer";

export class UsuarioController {
    private usuarioService: UsuarioService;

    constructor() {
        const usuarioRepositorio = new UsuarioRepositorio(pool)
        this.usuarioService = new UsuarioService(usuarioRepositorio);
    }

    // Controller para criar o usuarios
    public async criarUsuario(criarUsuarioDto: CriarUsuarioDto) {
        const usuario: any = await this.usuarioService.criarUsuario(criarUsuarioDto)
        return usuario
    }

    // Controller para buscar o usuarios por CPF
    public async buscarUsuarioPorCpfController(req: Request, res: Response) {
    }

}

