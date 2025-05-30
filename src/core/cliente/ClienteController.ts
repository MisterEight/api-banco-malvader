import {pool} from '../../config/database'
import { ClienteRepositorio } from './ClienteRepositorio';
import { ClienteService } from './ClienteService'
import { CriarClienteDto } from './dto/CriarClienteDto';

export class ClienteController {
    private clienteService: ClienteService;

    constructor (){
        const clienteRepositorio = new ClienteRepositorio(pool)
        this.clienteService = new ClienteService(clienteRepositorio)
    }

    public async criarCliente(criarClienteDto: CriarClienteDto): Promise<any> {
        const resultado = await this.clienteService.criarCliente(criarClienteDto);
        return resultado;
    }
}