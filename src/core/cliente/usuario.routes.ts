import { Router } from "express";
import { UsuarioController } from "./UsuarioController";

const router = Router();
const usuarioController = new UsuarioController();

// Rotas de Usuário;


/** =========================================================
 *                  METODOS POST
 * ==========================================================
 */
/** criar usuario */
router.post("/", async (req, res, next) => {
	try {
		await usuarioController.criarUsuario(req, res);
	} catch (err) {
		next(err);
	}
});


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
