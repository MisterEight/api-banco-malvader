import { Router } from "express";
import { UsuarioController } from "./UsuarioController";
import { validarDto } from "../../middlewares/validar-dto";
import { CriarUsuarioDto } from "./dto/CriarUsuario.dto";
import { BuscarUsuarioCpf } from "./dto/BuscaPorCpf.dto";
import { validarParamsDto } from "../../middlewares/validar-params-dto";
import { autenticarJWT, autenticarJWTComOTP, rotaProtegidaParaCliente, rotaProtegidaParaFuncionario } from "../../middlewares/validar-jwt";


const router = Router();
const usuarioController = new UsuarioController();

router.post(
  "/",
  validarDto(CriarUsuarioDto), 
  async (req, res, next) => {
    try {
      const resposta = await usuarioController.criarUsuario(req.body);
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