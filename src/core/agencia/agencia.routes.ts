import { Router } from "express";
import { validarParamsDto } from "../../middlewares/validar-params-dto";
import { autenticarJWT, autenticarJWTComOTP, rotaProtegidaParaCliente, rotaProtegidaParaFuncionario } from "../../middlewares/validar-jwt";
import { AgenciaController } from "./AgenciaController";
import { validarDto } from "../../middlewares/validar-dto";
import { CriarAgenciaDto } from "./dto/CriarAgenciaDto";


const router = Router();
const agenciaController = new AgenciaController();

// Rotas de Cliente;
/** =========================================================
 *                  METODOS POST
 * ==========================================================
 */
/** criar agencia */
router.post(
  "/",
  validarDto(CriarAgenciaDto), 
  async (req, res, next) => {
    try {
      const resposta = await agenciaController.criarAgencia(req.body);
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