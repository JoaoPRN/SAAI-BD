import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import db from "./database/config";
import route from "./routes/index";

const app = express();

const port = db.port;
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/", route);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
