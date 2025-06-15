import { Router } from 'express';
import { RelatorioController } from './RelatorioController';
import { validarDto } from '../../middlewares/validar-dto';
import { CriarRelatorioDto } from './dto/CriarRelatorioDto';

const router = Router();
const relatorioController = new RelatorioController();

router.post(
  '/',
  validarDto(CriarRelatorioDto),
  async (req, res, next) => {
    try {
      const resposta = await relatorioController.criarRelatorio(req.body);

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
