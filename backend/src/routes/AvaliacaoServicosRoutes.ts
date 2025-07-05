import { Router } from "express";
import AvaliacaoServicoController from "../controller/AvaliacaoServicoController";
import { RequisicaoAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoAvaliacaoServicoDTO";
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";

const router = Router();

router.post(
    "/avaliar",
    ValidacaoMiddleware(RequisicaoAvaliacaoServicoDTO),
    AvaliacaoServicoController.criarAvaliacaoServico
);

router.put(
    "/atualizar",
    ValidacaoMiddleware(RequisicaoAvaliacaoServicoDTO),
    AvaliacaoServicoController.atualizarAvaliacaoServico
);

router.delete(
    "/excluir",
    AvaliacaoServicoController.excluirAvaliacaoServico
);

router.get(
    "/consultar",
    AvaliacaoServicoController.consultaAvaliacaoServico
);

export default router;
