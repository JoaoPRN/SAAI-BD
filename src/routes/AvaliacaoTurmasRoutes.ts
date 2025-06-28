import { RequestHandler, Router } from "express";
import AlunoController from "../controller/AlunoController";
import { RequisicaoCriarAlunoDTO } from "../dtos/alunoDTO/RequisicaoCriarAlunoDTO";
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";
import { RequisicaoExcluirAlunoDTO } from "../dtos/alunoDTO/RequisicaoExcluirAlunoDTO";
import AvaliacaoTurmasController from "../controller/AvaliacaoTurmasController";

const router = Router();

router.post(
  "/avaliacao-turma",
  ValidacaoMiddleware(RequisicaoCriarAlunoDTO),
  AvaliacaoTurmasController.criarAvaliacaoTurma
);

router.delete(
  "/excluir-avaliacao-turma",
  ValidacaoMiddleware(RequisicaoExcluirAlunoDTO),
  AlunoController.excluirAluno
);

router.put("/atualizar-avaliacao-turma", AlunoController.listarAlunos);
router.get("/listar-avaliacoes-turma", AlunoController.listarAlunos);

export default router;
