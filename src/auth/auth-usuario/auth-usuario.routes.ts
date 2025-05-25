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
      const resposta = await authUsuarioController.loginUsuario(req.body);

        if(resposta.erro){
         res.status(resposta.status).json(resposta);
         return
        }
      
      res.json(resposta);
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
      //console.log(req.user)
      const validarOtpDados: ValidarOtpDados = {
        id_usuario: req.user.id,
        otp_codigo: req.body.otp_codigo
      }
      const token = await authUsuarioController.validarOtp(validarOtpDados)

       if(token.erro){
         res.status(token.status).json({ mensagem: token.mensagem });
         return
        }


      res.json(token)
    } catch (err){
        next(err)
    }
  }
)


export default router;