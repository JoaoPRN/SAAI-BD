import { Router } from "express";
import MatriculaController from "../controller/MatriculaController";

const router = Router();

router.get(
  "/consultar-matricula-aluno",
  MatriculaController.consultaAvaliacaoTurma
);

export default router;
