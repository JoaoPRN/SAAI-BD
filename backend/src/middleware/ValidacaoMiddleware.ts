import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";

export function ValidacaoMiddleware<T extends object>(DTOClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToClass(DTOClass, req.body);
    const errors = await validate(dtoObject);
    if (errors.length > 0) {
      const formattedErrors = errors.map((e) => ({
        property: e.property,
        constraints: e.constraints,
      }));
      res
        .status(400)
        .json({ message: "Erro de validação", errors: formattedErrors });
      return;
    }
    next();
  };
}
