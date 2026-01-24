import { Request, Response, NextFunction } from "express";

// Define the request listener middleware
const requestListener = (req: Request, _res: Response, next: NextFunction): void => {
  const { method } = req;

  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const output = ` - [Request] | Fecha UTC: ${(new Date()).toISOString()} | method: ${method} | Url: ${fullUrl} | - `;
  console.log(output);

  next();
};

export default requestListener;
