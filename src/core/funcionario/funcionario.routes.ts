import { Router } from "express";
import { FuncionarioController } from "./FuncionarioController";
import { validarDto } from "../../middlewares/validar-dto";
import { CriarFuncionarioDto } from "./dto/CriarFuncionario.dto";
import { AlterarCargoFuncionarioDto } from "./dto/AlterarCargoFuncionario.dto";

const router = Router();
const funcionarioController = new FuncionarioController()

router.post(
  "/",
  validarDto(CriarFuncionarioDto), 
  async (req, res, next) => {
    try {
      const resposta = await funcionarioController.criarFuncionario(req.body);

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


/** alterar cargo funcionario */
router.post(
  "/alterar-cargo",
  validarDto(AlterarCargoFuncionarioDto), 
  async (req, res, next) => {
    try {
      const resposta = await funcionarioController.alterarCargoFuncionario(req.body);

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

export default router