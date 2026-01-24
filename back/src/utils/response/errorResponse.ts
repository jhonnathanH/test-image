import { Response } from "express";
const isValidStatusCode = (code: any): boolean => {
  return Number.isInteger(code) && code >= 100 && code <= 599;
}

import { StatusCodeTypes } from "../../types/statusCodeTypes";

export default (res: Response, error: any) => {
  if (typeof error === "object" && error !== null) {
    const { code, message } = error;

    if (isValidStatusCode(code) && typeof message === "string") {
      return res.status(code).json({ message });
    }
  }
  const statusCode = isValidStatusCode(error?.code) ? error.code : StatusCodeTypes.BAD_REQUEST;
  let errorMessage;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "General error";
  }
  return res.status(statusCode).json({ message: errorMessage });
}
