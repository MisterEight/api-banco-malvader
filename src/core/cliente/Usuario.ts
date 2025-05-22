import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { formatDateToMySQL } from '../../utils/formatarDatas'; 

export class Usuario {
  public nome: string;
  public cpf: string;
  public data_nascimento: string;
  public tipo_usuario: string;
  public telefone: string;
  public senha_hash: string;
  public otp_ativo: boolean;
  public otp_expiracao: string;
  private otp_codigo!: string;

  constructor(args: {
    nome: string;
    cpf: string;
    data_nascimento: string;
    tipo_usuario?: string;
    telefone?: string;
    senha_hash: string;
    otp_ativo?: boolean;
  }) {
    this.nome = args.nome;
    this.cpf = args.cpf;
    this.data_nascimento = formatDateToMySQL(new Date(args.data_nascimento));
    this.tipo_usuario = args.tipo_usuario ?? 'comum';
    this.telefone = args.telefone ?? '';
    this.senha_hash = bcrypt.hashSync(args.senha_hash ?? '', 10);
    this.otp_ativo = args.otp_ativo ?? false;
    this.otp_expiracao = formatDateToMySQL(new Date(Date.now() + 1 * 60 * 1000)); // 1 minuto de validade
    this.otp_codigo = this.gerarOtp(); 
  }

  private gerarOtp(): string {
    return String(randomInt(100000, 1000000));
  }

  public getOtp(): string {
    return this.otp_codigo;
  }
}
