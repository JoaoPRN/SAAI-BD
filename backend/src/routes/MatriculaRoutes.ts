import { Router } from "express";
import MatriculaController from "../controller/MatriculaController";

const router = Router();

router.post(
  "/consultar-matricula-aluno",
  MatriculaController.consultarMatricula
);

export default router;
