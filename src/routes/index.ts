import express, { NextFunction, Request, Response } from "express";

import alunoRoutes from "./AlunoRoutes";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/aluno",
    route: alunoRoutes,
  },
  // {
  //   path: "/salas",
  //   route: salasRoutes,
  // },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
