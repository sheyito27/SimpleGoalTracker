import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Definir objeto con propiedades opcionales
interface ValidationConfig {
  body?: ZodSchema;
  params?: ZodSchema;
}

export const validate = (config: ValidationConfig) => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    // Validar body
    if (config.body) {
      const result = config.body.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: 'Error en el body', errors: result.error.format() });
      }
    }

    // Validar params
    if (config.params) {
      const result = config.params.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json({ message: 'Error en los params', errors: result.error.format() });
      }
    }
    
    next();
  };
};