import { Router } from "express";
import AvaliacaoServicoController from "../controller/AvaliacaoServicoController";
import { RequisicaoAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoAvaliacaoServicoDTO";
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";

const router = Router();

router.post(
    "/avaliacao-servico",
    ValidacaoMiddleware(RequisicaoAvaliacaoServicoDTO),
    AvaliacaoServicoController.criarAvaliacaoServico
);

router.put(
    "/atualizar-avaliacao-servico",
    ValidacaoMiddleware(RequisicaoAvaliacaoServicoDTO),
    AvaliacaoServicoController.atualizarAvaliacaoServico
);

router.delete(
    "/excluir-avaliacao-servico",
    AvaliacaoServicoController.excluirAvaliacaoServico
);

router.get(
    "/consultar-avaliacao-servico",
    AvaliacaoServicoController.consultaAvaliacaoServico
);

export default router;
