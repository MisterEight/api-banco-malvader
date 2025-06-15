import { Router } from 'express';
import { validarDto } from '../../middlewares/validar-dto';
import { AuditoriaController } from './AuditoriaController';
import { CriarAuditoriaDto } from './dto/CriarAuditoriaDto';

const router = Router();
const auditoriaController = new AuditoriaController();

router.post('/', validarDto(CriarAuditoriaDto), async (req, res, next) => {
    try {
        const resposta = await auditoriaController.registrarAuditoria(req.body);
        if (resposta?.erro) {
            res.status(resposta.codigo ?? 500).json({ erro: true, mensagem: resposta.mensagem });
            return;
        }
        res.json(resposta);
    } catch (err) {
        next(err);
    }
});

export default router;
