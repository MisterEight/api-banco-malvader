import { Router } from "express";
import { validarParamsDto } from "../../middlewares/validar-params-dto";
import { autenticarJWT, autenticarJWTComOTP, rotaProtegidaParaCliente, rotaProtegidaParaFuncionario } from "../../middlewares/validar-jwt";
import { ContaController } from "./ContaController";
import { validarDto } from "../../middlewares/validar-dto";
import { CriarContaDTO } from "./dto/CriarContaDto";


const router = Router();
const contaController = new ContaController();

router.post(
  "/",
  validarDto(CriarContaDTO), 
  async (req, res, next) => {
    try {
      const resposta = await contaController.criarConta(req.body);
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