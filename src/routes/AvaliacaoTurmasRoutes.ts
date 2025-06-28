import { Router } from "express";
import AlunoController from "../controller/AlunoController";
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
  AlunoController.listarAlunos
);

router.delete("/excluir-avaliacao-turma", AlunoController.excluirAluno);
router.get("/listar-avaliacoes-turma", AlunoController.listarAlunos);

export default router;
