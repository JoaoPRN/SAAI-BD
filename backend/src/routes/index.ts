import express, { NextFunction, Request, Response } from "express";

import alunoRoutes from "./AlunoRoutes";
import matriculaRoutes from "./MatriculaRoutes";
import avaliacaoTurmasRoutes from "./AvaliacaoTurmasRoutes";
const router = express.Router();

const defaultRoutes = [
  {
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
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
