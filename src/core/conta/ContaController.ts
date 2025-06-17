import { pool } from "../../config/database";
import { ContaRepositorio } from "./ContaRepositorio";
import { ContaService } from "./ContaService";
import { CriarContaDTO } from "./dto/CriarContaDto";


export class ContaController {
    private contaService: ContaService;

    constructor(){
        const contaRepositorio = new ContaRepositorio(pool)
        this.contaService = new ContaService(contaRepositorio)
    }

    public async criarConta(criarContaDTO: CriarContaDTO){
        const resposta = await this.contaService.criarConta(criarContaDTO)
        return resposta;
    }

    public async atualizarConta(contaDto: CriarContaDTO & { id_conta: string }){
        const resposta = await this.contaService.atualizarConta(contaDto);
        return resposta;
    }

    public async deletarConta(id_conta: string){
        const resposta = await this.contaService.deletarConta(id_conta);
        return resposta;
    }

    public async buscarContaPorId(id_conta: string){
        const resposta = await this.contaService.buscarContaPorId(id_conta);
        return resposta;
    }
}