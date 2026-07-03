import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;          // Para códigos Prisma (P2002, P2003...)
}

// Traducción de códigos Prisma -> HTTP
const PRISMA_HTTP: Record<string, { status: number, message: string }> = {
  P2002: { status: 409, message: 'Ya existe un registro con ese valor único.' },
  P2003: { status: 400, message: 'El recurso vinculado no existe' },
  P2025: { status: 404, message: 'Recurso no encontrado' }
};


export const errorHandler = (
  err: AppError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const prismaError = err.code ? PRISMA_HTTP[err.code] : undefined;
  const statusCode = prismaError?.status ?? err.statusCode ?? 500;

  // Mensaje controlado al cliente, sin exponer internos
  // Los errores menores a 500 son seguros, los error 500 exponen info
  const message = prismaError?.message ?? (statusCode < 500 ? err.message : 'Error interno del servidor')
  
  // Error al log de consola para debug
  console.error(`[Error] ${statusCode} -`, err);

  
  res.status(statusCode).json({
    status: 'error',
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // Devuelve línea exacta donde ha fallado el código, importante borrarlo si sale a producción
  });
};