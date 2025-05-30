import { Router } from "express";
import { UsuarioController } from "./UsuarioController";
import { validarDto } from "../../middlewares/validar-dto";
import { CriarUsuarioDto } from "./dto/CriarUsuario.dto";
import { BuscarUsuarioCpf } from "./dto/BuscaPorCpf.dto";
import { validarParamsDto } from "../../middlewares/validar-params-dto";
import { autenticarJWT, autenticarJWTComOTP, rotaProtegidaParaCliente, rotaProtegidaParaFuncionario } from "../../middlewares/validar-jwt";


const router = Router();
const usuarioController = new UsuarioController();

// Rotas de Usuário;
/** =========================================================
 *                  METODOS POST
 * ==========================================================
 */
/** criar usuario */
router.post(
  "/",
  validarDto(CriarUsuarioDto), 
  async (req, res, next) => {
    try {
      const usuario = await usuarioController.criarUsuario(req.body);
      res.json(usuario);
    } catch (err) {
      next(err);
    }
  }
);




/** =========================================================
 *                  METODOS GET
 * ==========================================================
 */
/** Buscar por usuario por cpf */ 
router.get(
  "/cpf/:cpf",
  autenticarJWTComOTP,
  rotaProtegidaParaCliente,
  rotaProtegidaParaFuncionario,
  validarParamsDto(BuscarUsuarioCpf),  
  async (req, res, next) => {
	try {

      let params: BuscarUsuarioCpf = {
        cpf: req.params.cpf
      }

     const usuario = await usuarioController.buscarUsuarioPorCpfController(params);
    res.json(usuario)
	} catch (err) {
		next(err);
	}
});

export default router;