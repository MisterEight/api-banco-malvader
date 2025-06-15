import { Router } from "express";
import { FaturaContaCorrenteController } from "./FaturaController";
import { CriarFaturaDto } from "./dto/CriarFaturaDto";
import { validarDto } from "../../middlewares/validar-dto";

const router = Router();
const faturaContaCorrenteController = new FaturaContaCorrenteController();

// Rota para criar uma nova fatura
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

      res.status(201).json(resposta); // Retorna 201 Created para POST
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/conta/:id_conta_corrente/faturas-abertas",
  async (req, res, next) => {
    try {
      const { id_conta_corrente } = req.params;
      const resposta = await faturaContaCorrenteController.buscarFaturasAbertasPorContaCorrente(id_conta_corrente);

      if (resposta?.erro) {
        res
          .status(resposta.codigo ? resposta.codigo : 500)
          .json({ erro: resposta.erro, mensagem: resposta.mensagem });
        return;
      }
      
      res.status(200).json(resposta);
    } catch (err) {
      next(err);
    }
  }
);


export default router;