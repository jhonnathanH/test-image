import { NextFunction, Request, Response } from "express";

export class HTTPError extends Error {
  statusCode: number;
  message: string;

  constructor (statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
export const errorHandler = (
  error: HTTPError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof HTTPError) {
    const { statusCode, message } = error;
    res.status(statusCode).json({
      statusCode,
      message
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error"
    });
  }
};
