import { Router } from "express";
import { validarParamsDto } from "../../middlewares/validar-params-dto";
import { autenticarJWT, autenticarJWTComOTP, rotaProtegidaParaCliente, rotaProtegidaParaFuncionario } from "../../middlewares/validar-jwt";
import { validarDto } from "../../middlewares/validar-dto";
import { ContaCorrenteController } from "./ContaCorrenteController";
import { CriarContaCorrenteDto } from "./dto/CriarContaCorrenteDto";
import { SaqueDepositoDto } from "./dto/SaqueDepositoDto";


const router = Router();
const contaCorrenteController = new ContaCorrenteController();

router.post(
  "/",
  validarDto(CriarContaCorrenteDto), 
  async (req, res, next) => {
    try {
      const resposta = await contaCorrenteController.criarContaCorrente(req.body);

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

router.post(
  '/sacar',
  validarDto(SaqueDepositoDto),
  async (req, res, next) => {
    try {
      const resposta = await contaCorrenteController.sacarSaldo(req.body);

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

router.post(
  '/depositar',
  validarDto(SaqueDepositoDto),
  async (req, res, next) => {
    try {
      const resposta = await contaCorrenteController.depositar(req.body);

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


router.get(
  '/:cpf',
 autenticarJWTComOTP,
  async (req, res, next) => {
    try {
      const resposta = await contaCorrenteController.buscarTodasContasCorrentesPorCpf(req.params.cpf);

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


router.get(
  '/informacoes/:idContaCorrente',
//  autenticarJWTComOTP,
  async (req, res, next) => {
    try {
      const resposta = await contaCorrenteController.buscarInformacoesDaContaCorrentePorId(req.params.idContaCorrente);

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