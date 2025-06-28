import { Router } from "express";

const router = Router();

router.put(
  "/atualizar-avaliacao-turma",
  ValidacaoMiddleware(RequisicaoAvaliacaoTurmasDTO),
  AlunoController.listarAlunos
);

router.delete("/excluir-avaliacao-turma", AlunoController.excluirAluno);
router.get("/listar-avaliacoes-turma", AlunoController.listarAlunos);
