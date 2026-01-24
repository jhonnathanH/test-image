import { Response } from "express";

export default (res: Response, statusCode: number, data?: any) => {
  return res.status(statusCode).json(data);
}
