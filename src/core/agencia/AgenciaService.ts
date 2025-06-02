import { Agencia } from "./Agencia";
import { AgenciaRepositorio } from "./AgenciaRepositorio";
import { CriarAgenciaDto } from "./dto/CriarAgenciaDto";

export class AgenciaService {
    constructor(
        readonly agenciaRepositorio: AgenciaRepositorio
    ) {}

    public async criarAgencia(criarAgenciaDto: CriarAgenciaDto) {
        const agencia = new Agencia(
            criarAgenciaDto.nome
        )

        const resposta = await this.agenciaRepositorio.criarAgencia(agencia);
        return resposta;
    }
}