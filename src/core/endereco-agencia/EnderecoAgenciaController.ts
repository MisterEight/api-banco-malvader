import { EnderecoAgenciaService } from "./EnderecoAgenciaService";
import { EnderecoAgenciaRepositorio } from "./EnderecoAgenciaRepositorio";
import { pool } from '../../config/database'
import { CriarEnderecoAgenciaDto } from "./dto/CriarEnderecoDto";

export class EnderecoAgenciaController {
    private enderecoAgenciaService: EnderecoAgenciaService;

    constructor(){
        const enderecoRepositorio = new EnderecoAgenciaRepositorio(pool)
        this.enderecoAgenciaService = new EnderecoAgenciaService(enderecoRepositorio)
    }

    public async criarEnderecoAgencia(criarEnderecoAgenciaDto: CriarEnderecoAgenciaDto) {
        const resposta = this.enderecoAgenciaService.criarEnderecoAgencia(criarEnderecoAgenciaDto);
        return resposta;
    }
     
}