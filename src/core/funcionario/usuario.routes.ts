import { Router } from "express";
import { FuncionarioController } from "./FuncionarioController";
import { validarDto } from "../../middlewares/validar-dto";
import { CriarFuncionarioDto } from "./dto/CriarFuncionario.dto";

const router = Router();
const funcionarioController = new FuncionarioController()

// Rotas de Usuário;


/** =========================================================
 *                  METODOS POST
 * ==========================================================
 */
/** criar usuario */
router.post(
  "/",
  validarDto(CriarFuncionarioDto), 
  async (req, res, next) => {
    try {
      const resposta = await funcionarioController.criarFuncionario(req.body);

      if(resposta.erro){
        res.status(500).json({erro: resposta.erro, mensagem: resposta.mensagem})
      }
      console.log("Essa é a resposta: ", resposta)
        res.json(resposta);
    } catch (err) {
      next(err);
    }
  }
);

export default router