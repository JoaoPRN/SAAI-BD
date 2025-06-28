import { RequestHandler, Router } from "express";
import AvaliacaoSalaController from "../controller/AvaliacaoSalaController";
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";
import { RequisicaoCriarAvaliacaoSalaDTO } from "../dtos/avaliacaoSala/RequisicaoCriarAvaliacaoSalaDTO";
import { RequisicaoExcluirAvaliacaoSalaDTO } from "../dtos/avaliacaoSala/RequisicaoExcluirAlunoDTO";
import AvaliacaoSalaService from "../service/AvaliacaoSalaService";

const router = Router();

router.post(
  "/criar",
  ValidacaoMiddleware(RequisicaoCriarAvaliacaoSalaDTO),
  AvaliacaoSalaController.criarAvaliacaoSala
);


router.get("/listar", AvaliacaoSalaController.listarAvaliacaoSalas);

router.delete("/excluir/:matricula/:sala/:semestre", async (req, res, next) => {
  try {
    const { matricula, sala, semestre } = req.params;

    await AvaliacaoSalaService.excluirAvaliacaoSala(
      parseInt(matricula),
      parseInt(sala),
      parseInt(semestre)
    );

    res.status(200).json({ mensagem: "Avaliação excluída com sucesso." });
  } catch (error) {
    next(error);
  }
});

export default router;
