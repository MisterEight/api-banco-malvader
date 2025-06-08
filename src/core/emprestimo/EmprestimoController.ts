import { pool } from "../../config/database";
import { CriarEmprestimoDto } from "./dto/CriarEmprestimoDto";
import { EmprestimoRepositorio } from "./EmprestimoRepositorio";
import { EmprestimoService } from "./EmprestimoService";

export class EmprestimoController {
    private emprestimoService: EmprestimoService;
    constructor(){
        const emprestimoRepositorio: EmprestimoRepositorio = new EmprestimoRepositorio(pool);
        this.emprestimoService = new EmprestimoService(emprestimoRepositorio)   
    }

    public async criarEmprestimo(criarEmprestimoDto: CriarEmprestimoDto) {
        const resposta = await this.emprestimoService.criarEmprestimo(criarEmprestimoDto);
        return resposta;
    }
}