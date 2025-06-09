import { Router } from "express";
import { validarParamsDto } from "../../middlewares/validar-params-dto";
import { autenticarJWT, autenticarJWTComOTP, rotaProtegidaParaCliente, rotaProtegidaParaFuncionario } from "../../middlewares/validar-jwt";
import { ContaInvestimentoController } from "./ContaInvestimentoController";
import { CriarContaInvestimentoDto } from "./dto/CriarContaInvestimento";
import { validarDto } from "../../middlewares/validar-dto";


const router = Router();
const contaInvestimentoController = new ContaInvestimentoController();

router.post(
  "/",
  validarDto(CriarContaInvestimentoDto), 
  async (req, res, next) => {
    try {
      const resposta = await contaInvestimentoController.criarContaInvestimento(req.body);
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

router.get(
  '/:cpf',
 autenticarJWTComOTP,
  async (req, res, next) => {
    try {
      const resposta = await contaInvestimentoController.buscarTodasContasInvestimentoPorCpf(req.params.cpf);

      if(resposta?.erro){
        res.status(resposta.codigo ? resposta.codigo : 500).json({erro: resposta.erro, mensagem: resposta.mensagem})
        return;
      }

      res.json(resposta);
    } catch (err) {
      next(err);
    }
  }
)

export default router;