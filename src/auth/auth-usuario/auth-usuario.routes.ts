import { Router } from "express";
import { validarDto } from "../../middlewares/validar-dto";
import { AuthUsuarioController } from "./auth-usuario.controller";
import { LoginUsuarioDTO } from "./dto/LoginUsuario.dto";
import { ValidarDtpDTO } from "./dto/EnviarOtp.dto";
import { ValidarOtpDados } from "./interfaces/validar-otp.interface";
import { autenticarJWT } from "../../middlewares/validar-jwt";


const router = Router();
const authUsuarioController = new AuthUsuarioController();

// Rotas de Usuário;


/** =========================================================
 *                  METODOS POST
 * ==========================================================
 */
/** login usuario */
router.post(
  "/login",
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


router.post(
  '/validar-otp',
  autenticarJWT,
  validarDto(ValidarDtpDTO),
  async (req , res , next) => {
    try {
      console.log(req.user)
      const validarOtpDados: ValidarOtpDados = {
        id_usuario: req.user.id,
        otp_codigo: req.body.otp_codigo
      }
      const token = await authUsuarioController.validarOtp(validarOtpDados)

       if(token.erro){
         res.status(token.status).json({ mensagem: token.mensagem });
        }


      res.json(token)
    } catch (err){
        next(err)
    }
  }
)


export default router;