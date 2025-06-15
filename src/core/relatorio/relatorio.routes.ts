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

router.get(
  '/financeiro',
  async (req, res, next) => {
    try {
      const { inicio = '', fim = '', formato = 'excel' } = req.query;
      const resposta = await relatorioController.exportarRelatorioFinanceiro(
        String(inicio),
        String(fim),
        String(formato)
      );

      if (resposta?.erro) {
        res.status(resposta.codigo ? resposta.codigo : 500).json({ erro: resposta.erro, mensagem: resposta.mensagem });
        return;
      }

      if (resposta.tipo === 'excel') {
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio_financeiro.xlsx');
      } else {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio_financeiro.pdf');
      }
      res.end(resposta.buffer);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
