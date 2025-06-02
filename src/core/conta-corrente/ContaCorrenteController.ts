import { pool } from "../../config/database";
import { ContaCorrenteRepositorio } from "./ContaCorrenteRepositorio";
import { ContaCorrenteService } from "./ContaCorrenteService";

export class ContaCorrenteController {
    private contaCorrenteService: ContaCorrenteService;

    constructor(){
        const contaCorrenteRepositorio: ContaCorrenteRepositorio = new ContaCorrenteRepositorio(pool)
        this.contaCorrenteService = new ContaCorrenteService(contaCorrenteRepositorio)
    }
}