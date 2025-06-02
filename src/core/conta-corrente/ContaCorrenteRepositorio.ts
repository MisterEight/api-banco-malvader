import { Pool } from "mysql2/promise";
import { CriarContaCorrenteDto } from "./dto/CriarContaCorrente";

export class ContaCorrenteRepositorio {
    constructor(readonly pool: Pool){}

    public async criarContaCorrente(criarContaCorrenteDto: CriarContaCorrenteDto): Promise<any> {
        const sql = `
            
        `
    }
}