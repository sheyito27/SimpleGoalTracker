import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  
  console.error(`[Error] ${statusCode} - ${err.message}`);

  
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // Devuelve línea exacta donde ha fallado el código, importante borrarlo si sale a producción
  });
};