import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors';
import { env, isDevelopment } from '../config/env';

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (error instanceof AppError) {
    const response: Record<string, any> = {
      status: 'error',
      code: error.code,
      message: error.message,
    };

    if (error instanceof ValidationError) {
      response.errors = error.errors;
    }

    if (isDevelopment) {
      response.stack = error.stack;
    }

    res.status(error.statusCode).json(response);
    return;
  }

  // Erros desconhecidos
  console.error('❌ Unhandled error:', error);

  res.status(500).json({
    status: 'error',
    code: 'INTERNAL_ERROR',
    message: isDevelopment ? error.message : 'An unexpected error occurred',
    ...(isDevelopment && { stack: error.stack }),
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    status: 'error',
    code: 'NOT_FOUND',
    message: 'The requested resource was not found',
  });
}