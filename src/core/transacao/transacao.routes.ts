import { Router } from "express";
import { validarParamsDto } from "../../middlewares/validar-params-dto";
import { autenticarJWT, autenticarJWTComOTP, rotaProtegidaParaCliente, rotaProtegidaParaFuncionario } from "../../middlewares/validar-jwt";
import { validarDto } from "../../middlewares/validar-dto";
import { TransacaoController } from "./TransacaoController";
import { CriarTransacaoDTO } from "./dto/CriarTransacaoDto";

const router = Router();
const transacaoController = new TransacaoController();

router.post(
  "/",
  validarDto(CriarTransacaoDTO), 
  async (req, res, next) => {
    try {
      const resposta = await transacaoController.inserirTransacao(req.body);

      if(resposta?.erro){
        res.status(resposta.codigo ? resposta.codigo : 500).json({erro: resposta.erro, mensagem: resposta.mensagem})
        return;
      }

      res.json(resposta);
    } catch (err) {
      next(err);
    }
  }
);

export default router;