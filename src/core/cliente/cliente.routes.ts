import { Router } from "express";
import { validarParamsDto } from "../../middlewares/validar-params-dto";
import { autenticarJWT, autenticarJWTComOTP, rotaProtegidaParaCliente, rotaProtegidaParaFuncionario } from "../../middlewares/validar-jwt";
import { ClienteController } from "./ClienteController";
import { validarDto } from "../../middlewares/validar-dto";
import { CriarClienteDto } from "./dto/CriarClienteDto";


const router = Router();
const clienteController = new ClienteController();

// Rotas de Cliente;
/** =========================================================
 *                  METODOS POST
 * ==========================================================
 */
/** criar cliente */
router.post(
  "/",
  validarDto(CriarClienteDto), 
  async (req, res, next) => {
    try {
      const resposta = await clienteController.criarCliente(req.body);

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




/** =========================================================
 *                  METODOS GET
 * ==========================================================
 */

export default router;