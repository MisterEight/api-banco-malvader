import { Usuario } from "./Usuario";
import { UsuarioRepositorio } from "./UsuarioRepositorio";
import { pool } from "../../config/database"
import { Response, Request } from "express";
import { UsuarioService } from "./UsuarioService";
import { Erro } from "../../utils/interfaces/respostas";
import { CriarUsuarioDto } from "./dto/CriarUsuario.dto";
import { validarDto } from "../../middlewares/validar-dto";
import { plainToInstance } from "class-transformer";
import { BuscarUsuarioCpf } from "./dto/BuscaPorCpf.dto";
import { FuncionarioRepositorio } from "../funcionario/FuncionarioRepositorio";
import { ClienteRepositorio } from "../cliente/ClienteRepositorio";

export class UsuarioController {
    private usuarioService: UsuarioService;

    constructor() {
        const usuarioRepositorio = new UsuarioRepositorio(pool);
        const funcionarioRepositorio = new FuncionarioRepositorio(pool);
        const clienteRepositorio = new ClienteRepositorio(pool)
        this.usuarioService = new UsuarioService(usuarioRepositorio, funcionarioRepositorio, clienteRepositorio);
    }
    
    public async criarUsuario(criarUsuarioDto: CriarUsuarioDto) {
        const usuario: any = await this.usuarioService.criarUsuario(criarUsuarioDto);
        return usuario;
    }

    public async buscarUsuarioPorCpfController(params: BuscarUsuarioCpf) {
        const usuario: any = await this.usuarioService.buscarUsuarioCpf(params);
        return usuario;
    }

}

