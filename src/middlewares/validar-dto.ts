import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";


// Esse para validar informações que recebemos do body
export function validarDto(tipoDto: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if(!req.body){
      res.status(500).json({
        erro: true,
        mensagem: "Corpo da requisição está vázio"
      })
    }
    const dtoConvertido = plainToInstance(tipoDto, req.body);
    const erros = await validate(dtoConvertido as object);

    if (erros.length > 0) {
      res.status(400).json({
        mensagem: 'Erro de validação',
        erros: erros.map(erro => ({
          campo: erro.property,
          mensagens: Object.values(erro.constraints || {})
        }))
      });
      return; 
    }

    req.body = dtoConvertido;
    next();
  };
}
