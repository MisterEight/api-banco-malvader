import { Router } from "express";
import { UsuarioController } from "./UsuarioController";
import { validarDto } from "../../middlewares/validar-dto";
import { CriarUsuarioDto } from "./dto/CriarUsuario.dto";

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
  validarDto(CriarUsuarioDto), // <-- middleware que valida e converte req.body
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
router.get("/cpf/:cpf", async (req, res, next) => {
	try {
		await usuarioController.buscarUsuarioPorCpfController(req, res);
	} catch (err) {
		next(err);
	}
});


export default router;
