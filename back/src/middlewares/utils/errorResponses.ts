import { StatusCodeTypes } from "../../types/statusCodeTypes";

class CustomError extends Error {
  code: number;

  constructor (code: number, name: string, message: string) {
    super(message);
    this.name = name;
    this.code = code;
  }
}

const EXPIRED_TOKEN_ERROR = {
  code: StatusCodeTypes.FORBIDDEN,
  name: "expiredTokenException",
  message: "Unauthorized! Access Token was expired!"
};

const NOT_AUTH_HEADER_FOUND_ERROR = {
  code: StatusCodeTypes.FORBIDDEN,
  name: "authHeaderNotFoundException",
  message: "No Authorization header was found"
};

const INVALID_TOKEN_ERROR = {
  code: StatusCodeTypes.FORBIDDEN,
  name: "invalidTokenException",
  message: "Invalid token"
};

const UNAUTHORIZED_TOKEN_ERROR = {
  code: StatusCodeTypes.UNAUTHORIZED,
  name: "unauthorizedException",
  message: "Unauthorized!"
};


const EXPIRED_TOKEN = new CustomError(EXPIRED_TOKEN_ERROR.code, EXPIRED_TOKEN_ERROR.name, EXPIRED_TOKEN_ERROR.message);
const NOT_AUTH_HEADER_FOUND = new CustomError(NOT_AUTH_HEADER_FOUND_ERROR.code, NOT_AUTH_HEADER_FOUND_ERROR.name, NOT_AUTH_HEADER_FOUND_ERROR.message);
const INVALID_TOKEN = new CustomError(INVALID_TOKEN_ERROR.code, INVALID_TOKEN_ERROR.name, INVALID_TOKEN_ERROR.message);
const UNAUTHORIZED_TOKEN = new CustomError(UNAUTHORIZED_TOKEN_ERROR.code, UNAUTHORIZED_TOKEN_ERROR.name, UNAUTHORIZED_TOKEN_ERROR.message);

export {
  EXPIRED_TOKEN,
  NOT_AUTH_HEADER_FOUND,
  INVALID_TOKEN,
  UNAUTHORIZED_TOKEN
};

