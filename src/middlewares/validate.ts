import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schemaBody?: ZodSchema, schemaParams?: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {

    // Validar body
    if (schemaBody) {
      const result = schemaBody.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: 'Error en el body', errors: result.error.format() });
      }
    }

    // Validar params
    if (schemaParams) {
      const result = schemaParams.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json({ message: 'Error en los params', errors: result.error.format() });
      }
    }
    
    next();
  };
};