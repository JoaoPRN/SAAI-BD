import express, { NextFunction, Request, response, Response } from "express";
import aluno from "../controller/aluno";

const router = express.Router();
//create employee
router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await aluno(req.body));
    } catch (err) {
      next(err);
    }
  }
);

export default router;