import { Auditoria } from './Auditoria';
import { AuditoriaRepositorio } from './AuditoriaRepositorio';
import { CriarAuditoriaDto } from './dto/CriarAuditoriaDto';

export class AuditoriaService {
    constructor(private readonly auditoriaRepositorio: AuditoriaRepositorio) {}

    public async registrarAuditoria(dto: CriarAuditoriaDto) {
        const auditoria = new Auditoria(dto.id_usuario, dto.acao, dto.detalhes);
        const resultado = await this.auditoriaRepositorio.inserirAuditoria(auditoria);
        return resultado;
    }
}
