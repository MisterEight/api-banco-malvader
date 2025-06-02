import { CriarEnderecoAgenciaDto } from "./dto/CriarEnderecoDto";
import { EnderecoAgencia } from "./EnderecoAgencia";
import { EnderecoAgenciaRepositorio } from "./EnderecoAgenciaRepositorio";

export class EnderecoAgenciaService {
    constructor(readonly enderecoRepositorio: EnderecoAgenciaRepositorio){}

    public async criarEnderecoAgencia(criarEnderecoAgenciaDto: CriarEnderecoAgenciaDto): Promise<any> {

        const enderecoAgencia = new EnderecoAgencia(
            criarEnderecoAgenciaDto.id_agencia,
            criarEnderecoAgenciaDto.cep,
            criarEnderecoAgenciaDto.local,
            criarEnderecoAgenciaDto.numero_casa,
            criarEnderecoAgenciaDto.bairro,
            criarEnderecoAgenciaDto.cidade,
            criarEnderecoAgenciaDto.estado,
            criarEnderecoAgenciaDto.complemento,          
        )

        const resposta = await this.enderecoRepositorio.criarEnderecoAgencia(enderecoAgencia)
        return resposta;
    }
}