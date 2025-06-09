import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { verificarToken } from '../auth/jwt/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function autenticarJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  let token;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ mensagem: 'Permissão negada, necessário realizar o login na aplicação' });
    return;
  } else {
    token = authHeader.split(' ')[1];

    try {
      const payload = verificarToken(token)

      if (payload.erro) {
        res.status(401).json({ mensagem: payload.mensagem });
        return;
      }

      req.user = payload;

      //console.log(req.user)
      next();
    } catch (erro) {
      res.status(403).json({ mensagem: 'Token inválido ou expirado' });
      return;
    }
  }


}
export function autenticarJWTComOTP(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  let token;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ mensagem: 'Permissão negada, necessário realizar o login na aplicação' });
    return;
  } else {
    token = authHeader.split(' ')[1];

    try {
      const payload = verificarToken(token)

      if (payload.erro) {
        res.status(401).json({ mensagem: payload.mensagem });
        return;
      }

      console.log("Essse é o valor payload: ", payload)
      if (!!payload.otp_ativo) {
        if (!payload.otp_validado) {
          res.status(401).json({ otp_valido: false, mensagem: 'É necessário realizar o validação do OTP' })
          return
        }
      }

      req.user = payload;

      //console.log(req.user)
      next();
    } catch (erro) {
      res.status(403).json({ mensagem: 'Token inválido ou expirado' });
      return;
    }
  }
}

export function rotaProtegidaParaFuncionario(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  let token;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ mensagem: 'Permissão negada, necessário realizar o login na aplicação' });
    return;
  } else {
    token = authHeader.split(' ')[1];

    try {
      const payload = verificarToken(token)

      if (payload.erro) {
        res.status(401).json({ mensagem: payload.mensagem });
        return;
      }

      console.log("Essse é o valor payload: ", payload)
      if (!!payload.otp_ativo) {
        if (!payload.otp_validado) {
          res.status(401).json({ otp_valido: false, mensagem: 'É necessário realizar o validação do OTP' })
          return
        }
      }

      if(!payload.eFuncionario){
        res.status(401).json({ 
          erro: true,
          mensagem: 'Permissão negada, rota protegida para funcionários'
        })
      }
    } catch (erro) {

    }
  }
}

export function rotaProtegidaParaCliente(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  let token;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ mensagem: 'Permissão negada, necessário realizar o login na aplicação' });
    return;
  } else {
    token = authHeader.split(' ')[1];

    try {
      const payload = verificarToken(token)

      if (payload.erro) {
        res.status(401).json({ mensagem: payload.mensagem });
        return;
      }

      if(!payload.eCliente){
        res.status(401).json({ 
          erro: true,
          mensagem: 'Permissão negada, rota protegida para clientes'
        })
      }
    } catch (erro) {

    }
  }
}

