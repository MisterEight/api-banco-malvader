import { Router } from "express";
import { validarParamsDto } from "../../middlewares/validar-params-dto";
import { autenticarJWT, autenticarJWTComOTP, rotaProtegidaParaCliente, rotaProtegidaParaFuncionario } from "../../middlewares/validar-jwt";
import { validarDto } from "../../middlewares/validar-dto";
import { ContaPoupancaController } from "./ContaPoupancaController";
import { CriarContaPoupancaDto } from "./dto/CriarContaPoupanca";



const router = Router();
const contaCorrenteController = new ContaPoupancaController();

router.post(
  "/",
  validarDto(CriarContaPoupancaDto), 
  async (req, res, next) => {
    try {
      const resposta = await contaCorrenteController.criarContaPoupanca(req.body);

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