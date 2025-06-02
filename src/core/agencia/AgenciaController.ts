import { AgenciaRepositorio } from "./AgenciaRepositorio";
import { AgenciaService } from "./AgenciaService";
import { pool } from '../../config/database'
import { CriarAgenciaDto } from "./dto/CriarAgenciaDto";

export class AgenciaController {
    private agenciaService: AgenciaService;

    constructor(){
        const agenciaRepositorio: AgenciaRepositorio = new AgenciaRepositorio(pool)
        this.agenciaService = new AgenciaService(agenciaRepositorio)
    }

    public async criarAgencia(criarAgenciaDto: CriarAgenciaDto) {
        const resposta = await this.agenciaService.criarAgencia(criarAgenciaDto)
        return resposta;
    }
}