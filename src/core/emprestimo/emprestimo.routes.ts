import { Router } from "express";
import { EmprestimoController } from "./EmprestimoController";
import { CriarEmprestimoDto } from "./dto/CriarEmprestimoDto";
import { validarDto } from "../../middlewares/validar-dto";


const router = Router();
const emprestimoController = new EmprestimoController();

router.post(
  "/",
  validarDto(CriarEmprestimoDto), 
  async (req, res, next) => {
    try {
      const resposta = await emprestimoController.criarEmprestimo(req.body);

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