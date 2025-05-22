import { Router } from "express";
import { validarDto } from "../../middlewares/validar-dto";
import { AuthUsuarioController } from "./auth-usuario.controller";
import { LoginUsuarioDTO } from "./dto/LoginUsuario.dto";


const router = Router();
const authUsuarioController = new AuthUsuarioController();

// Rotas de Usuário;


/** =========================================================
 *                  METODOS POST
 * ==========================================================
 */
/** criar usuario */
router.post(
  "/",
  validarDto(LoginUsuarioDTO), 
  async (req, res, next) => {
    try {
      const usuario = await authUsuarioController.loginUsuario(req.body);

        if(usuario.erro){
         res.status(usuario.status).json({ mensagem: usuario.mensagem });
        }
      
      res.json(usuario);
    } catch (err) {
      next(err);
    }
  }
);


export default router;