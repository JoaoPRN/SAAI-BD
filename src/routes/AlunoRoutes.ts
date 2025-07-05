import { RequestHandler, Router } from "express";
import AlunoController from "../controller/AlunoController";
import { RequisicaoCriarAlunoDTO } from "../dtos/alunoDTO/RequisicaoCriarAlunoDTO";
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";
import { RequisicaoExcluirAlunoDTO } from "../dtos/alunoDTO/RequisicaoExcluirAlunoDTO";

const router = Router();

router.post(
  "/criar-aluno",
  ValidacaoMiddleware(RequisicaoCriarAlunoDTO),
  AlunoController.criarAluno
);

router.delete(
  "/excluir-aluno",
  ValidacaoMiddleware(RequisicaoExcluirAlunoDTO),
  AlunoController.excluirAluno
);

router.get("/listar-alunos", AlunoController.listarAlunos);

export default router;
