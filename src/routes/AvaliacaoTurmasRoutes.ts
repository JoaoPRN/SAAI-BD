import { Router } from "express";
import AvaliacaoTurmasController from "../controller/AvaliacaoTurmasController";
import { RequisicaoAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoAvaliacaoTurmasDTO";
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";

const router = Router();

router.post(
  "/avaliacao-turma",
  ValidacaoMiddleware(RequisicaoAvaliacaoTurmasDTO),
  AvaliacaoTurmasController.criarAvaliacaoTurma
);

router.put(
  "/atualizar-avaliacao-turma",
  ValidacaoMiddleware(RequisicaoAvaliacaoTurmasDTO),
  AvaliacaoTurmasController.atualizarAvaliacaoTurma
);

router.delete(
  "/excluir-avaliacao-turma",
  AvaliacaoTurmasController.excluirAvaliacaoTurma
);
router.get(
  "/consultar-avaliacao-turma",
  AvaliacaoTurmasController.consultaAvaliacaoTurma
);

export default router;
