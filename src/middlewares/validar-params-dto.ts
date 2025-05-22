import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";


// Usamos esse quando queremos validar informações que vêm dos params
export function validarParamsDto(tipoDto: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoConvertido = plainToInstance(tipoDto, req.params);
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
