import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv'; //teste

dotenv.config();

const app = express();
import db from "./database/config";
import aluno from "./routes/AlunoRoutes";
import professor from "./routes/ProfessorRoutes";
import test from "./routes/teste"; //teste

const port = db.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => { // requisicao get normal
  res.status(200).send("oi, rota incial");
});

app.use('/test', test); // monta uma rota teste

app.use("/aluno", aluno);
app.use("/professor", professor);

/* Error handler middleware */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
