import { Router } from "express";
import { EnderecoAgenciaController } from "./EnderecoAgenciaController";
import { validarDto } from "../../middlewares/validar-dto";
import { CriarEnderecoAgenciaDto } from "./dto/CriarEnderecoDto";

const router = Router()
const enderecoAgenciaController: EnderecoAgenciaController = new EnderecoAgenciaController()

router.post(
  "/",
  validarDto(CriarEnderecoAgenciaDto), 
  async (req, res, next) => {
    try {
      const resposta = await enderecoAgenciaController.criarEnderecoAgencia(req.body);

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

export default router;