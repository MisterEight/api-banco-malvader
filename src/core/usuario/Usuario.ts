import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { emit } from 'process';
import { v4 as uuidv4 } from 'uuid';

export class Usuario {
  private id!: string;
  public nome: string;
  public cpf: string;
  public data_nascimento: Date;
  public tipo_usuario: string;
  public telefone: string;
  public senha_hash: string;
  public otp_ativo: boolean;
  public otp_expiracao: Date;
  private otp_codigo!: string;
  private email: string;

  constructor(args: {
    nome?: string;
    cpf?: string;
    data_nascimento?: string;
    tipo_usuario?: string;
    telefone?: string;
    email?: string
  }) {
    this.id = uuidv4()
    this.nome = args.nome ?? '';
    this.cpf = args.cpf ?? '';
    this.data_nascimento = args.data_nascimento ? new Date(args.data_nascimento) : new Date();
    this.tipo_usuario = args.tipo_usuario ?? 'comum';
    this.telefone = args.telefone ?? '';
    this.senha_hash = ''; 
    this.otp_ativo = false;
    this.otp_expiracao = new Date();
    this.email = args.email ?? ''
  }

  public setSenha(senha: string): void {
    this.senha_hash = bcrypt.hashSync(senha, 10);
  }

  public gerarOtp(): void {
    this.otp_codigo = String(randomInt(100000, 1000000));
    this.otp_ativo = true;
    this.otp_expiracao = new Date(Date.now() + 5 * 60 * 1000);
  }

  public desativarOtp(): void {
    this.otp_ativo = false;
  }

  public getOtp(): string {
    return this.otp_codigo;
  }

  public dadosTratados(): Record<string, any> {
    return {
      id_usuario: this.id,
      nome: this.nome,
      cpf: this.cpf,
      data_nascimento: this.data_nascimento.toISOString().split('T')[0], 
      tipo_usuario: this.tipo_usuario,
      telefone: this.telefone,
      senha_hash: this.senha_hash,
      otp_ativo: this.otp_ativo,
      otp_expiracao: this.otp_expiracao.toISOString().slice(0, 19).replace('T', ' '),
      email: this.email
    };
  }
}
