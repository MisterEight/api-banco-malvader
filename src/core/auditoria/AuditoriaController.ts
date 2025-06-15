import { pool } from '../../config/database';
import { AuditoriaRepositorio } from './AuditoriaRepositorio';
import { AuditoriaService } from './AuditoriaService';
import { CriarAuditoriaDto } from './dto/CriarAuditoriaDto';

export class AuditoriaController {
    private auditoriaService: AuditoriaService;
    constructor() {
        const auditoriaRepositorio = new AuditoriaRepositorio(pool);
        this.auditoriaService = new AuditoriaService(auditoriaRepositorio);
    }

    public async registrarAuditoria(dto: CriarAuditoriaDto) {
        return await this.auditoriaService.registrarAuditoria(dto);
    }
}
