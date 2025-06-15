import { Router } from "express";
import { FaturaContaCorrenteController } from "./FaturaController";
import { CriarFaturaDto } from "./dto/CriarFaturaDto";
import { validarDto } from "../../middlewares/validar-dto";

const router = Router();
const faturaContaCorrenteController = new FaturaContaCorrenteController();

router.post(
  "/",
  validarDto(CriarFaturaDto),
  async (req, res, next) => {
    try {
      const resposta = await faturaContaCorrenteController.criarFatura(req.body);

      if (resposta?.erro) {
        res
          .status(resposta.codigo ? resposta.codigo : 500)
          .json({ erro: resposta.erro, mensagem: resposta.mensagem });
        return;
      }

      res.json(resposta);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
