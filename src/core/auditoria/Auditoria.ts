import { v4 as uuidv4 } from 'uuid';

export class Auditoria {
    private id_auditoria: string;
    private id_usuario: string;
    private acao: string;
    private detalhes: string;
    private data_hora: string;

    constructor(id_usuario: string, acao: string, detalhes: string, data_hora?: string){
        this.id_auditoria = uuidv4();
        this.id_usuario = id_usuario;
        this.acao = acao;
        this.detalhes = detalhes;
        this.data_hora = data_hora ? new Date(data_hora).toISOString().replace('T',' ').substring(0,19) : new Date().toISOString().replace('T',' ').substring(0,19);
    }

    public getIdAuditoria(){ return this.id_auditoria; }
    public getIdUsuario(){ return this.id_usuario; }
    public getAcao(){ return this.acao; }
    public getDetalhes(){ return this.detalhes; }
    public getDataHora(){ return this.data_hora; }
}
