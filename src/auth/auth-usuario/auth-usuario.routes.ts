import { Router } from "express";
import { validarDto } from "../../middlewares/validar-dto";
import { AuthUsuarioController } from "./auth-usuario.controller";
import { LoginUsuarioDTO } from "./dto/LoginUsuario.dto";
import { ValidarDtpDTO } from "./dto/EnviarOtp.dto";
import { ValidarOtpDados } from "./interfaces/validar-otp.interface";
import { autenticarJWT, autenticarJWTComOTP, rotaProtegidaParaCliente } from "../../middlewares/validar-jwt";


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

// validar otp
router.post(
  '/validar-otp',
  autenticarJWT,
  validarDto(ValidarDtpDTO),
  async (req , res , next) => {
    try {
      console.log("Informações req.user",req.user)
      const validarOtpDados: ValidarOtpDados = {
        id_usuario: req.user.id,
        eCliente: req.user?.eCliente ? req.user?.eCliente : false,
        eFuncionario: req.user?.eFuncionario ? req.user?.eFuncionario : false,
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