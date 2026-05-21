import { ErrorRequestHandler } from 'express';
import { HttpError } from '../errors/HttpError';

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  console.error(`[ErrorHandler] ${req.method} ${req.originalUrl}`, error);
  res.status(500).json({ message: 'Internal server error' });
};
