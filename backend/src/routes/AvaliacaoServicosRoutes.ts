import { Router } from "express";
import AvaliacaoServicoController from "../controller/AvaliacaoServicoController";
import { RequisicaoCriarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoCriarAvaliacaoServicoDTO";
import { RequisicaoAtualizarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoAtualizarAvaliacaoServicoDTO";
import { RequisicaoExcluirAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoExcluirAvaliacaoServicoDTO"; // AGORA USADA
import { RequisicaoListarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoListarAvaliacaoServicoDTO"; // AGORA USADA
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";

const router = Router();

router.post(
  "/avaliar",
  ValidacaoMiddleware(RequisicaoCriarAvaliacaoServicoDTO),
  AvaliacaoServicoController.criarAvaliacaoServico
);

router.put(
  "/atualizar",
  ValidacaoMiddleware(RequisicaoAtualizarAvaliacaoServicoDTO),
  AvaliacaoServicoController.atualizarAvaliacaoServico
);

router.delete(
  "/excluir",
  ValidacaoMiddleware(RequisicaoExcluirAvaliacaoServicoDTO),
  AvaliacaoServicoController.excluirAvaliacaoServico
);

router.get(
  "/listar",
  ValidacaoMiddleware(RequisicaoListarAvaliacaoServicoDTO),
  AvaliacaoServicoController.consultaAvaliacaoServico
);

export default router;