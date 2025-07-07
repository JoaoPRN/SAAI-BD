import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import db from "./database/config";
import route from "./routes/index";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const port = db.port;
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Express.js API",
      version: "1.0.0",
      description: "A sample Express.js API built with TypeScript and Swagger",
    },
  },
  apis: ["./src/routes/**/*.ts"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log(JSON.stringify(swaggerDocs, null, 2));

app.use("/", route);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(`Documentação Swagger em http://localhost:${port}/api-docs`);
});

export default app;
