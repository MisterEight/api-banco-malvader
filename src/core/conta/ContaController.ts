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
}