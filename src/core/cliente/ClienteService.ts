import { Cliente } from "./Cliente";
import { ClienteRepositorio } from "./ClienteRepositorio";
import { CriarClienteDto } from "./dto/CriarClienteDto";
import { ClienteCriado, ErroPersonalizado } from "./interfaces/cliente.intefaces";

export class ClienteService {
    constructor(
        readonly clienteRepositorio: ClienteRepositorio
    ) {}

    public async criarCliente(criarClienteDto: CriarClienteDto){

        const cliente = new Cliente(
            criarClienteDto.id_usuario
        )

        const resultado: ClienteCriado | ErroPersonalizado = await this.clienteRepositorio.criarCliente(cliente)

        if ('id_cliente' in resultado) {
            const idCliente = resultado.id_cliente;
        }

        return resultado;
    }
}