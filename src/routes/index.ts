import express, { NextFunction, Request, Response } from "express";

import db from "../database/config";
import avaliacaoSalaAulaRoutes from "./AvaliacaoSalaRoutes";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/avaliacaoSalaAula",
    route: avaliacaoSalaAulaRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
