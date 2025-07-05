import express, { NextFunction, Request, Response } from "express";

<<<<<<< HEAD
import alunoRoutes from "./AlunoRoutes";
import matriculaRoutes from "./MatriculaRoutes";
import avaliacaoTurmasRoutes from "./AvaliacaoTurmasRoutes";
=======
import db from "../database/config";
import avaliacaoSalaAulaRoutes from "./AvaliacaoSalaRoutes";

>>>>>>> carol-backend-ajustada
const router = express.Router();

const defaultRoutes = [
  {
<<<<<<< HEAD
    path: "/aluno",
    route: alunoRoutes,
  },
  {
    path: "/avaliacao-turmas",
    route: avaliacaoTurmasRoutes,
  },
  {
    path: "/matricula",
    route: matriculaRoutes,
=======
    path: "/avaliacaoSalaAula",
    route: avaliacaoSalaAulaRoutes,
>>>>>>> carol-backend-ajustada
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
