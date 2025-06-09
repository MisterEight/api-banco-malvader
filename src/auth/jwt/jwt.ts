import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'lalalalalal';
const EXPIRACAO_PADRAO: SignOptions['expiresIn'] = '10h';

export function gerarToken(
  payload: object,
  expiresIn: SignOptions['expiresIn'] = EXPIRACAO_PADRAO
): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verificarToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return {
      erro: true,
      status: 401,
      mensagem: "Token inválido ou expirado",
    };
  }
}
