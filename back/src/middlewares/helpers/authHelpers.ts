import errorResponse from "../../utils/response/errorResponse";
import IgnoreUrls from "../../interfaces/ignoreUrls";
import { BEARER, SLASH } from "../utils/constants";
import { EXPIRED_TOKEN, UNAUTHORIZED_TOKEN } from "../../middlewares/utils/errorResponses";

/**
 *  It'll return true if the path should be ignored, otherwise will return false.
 *
 * @param req Object
 * @param ignoreUrls IgnoreUrls
 *
 */
export function isPathIgnored (req: any, ignoreUrls: IgnoreUrls) {
  const pathLastCharacter = req.path.slice(-1);
  let path: string = req.path;
  const method = req.method.toUpperCase() as keyof IgnoreUrls;

  if (pathLastCharacter === SLASH) {
    path = path.substring(0, path.length - 1);
  }
  for (const element of ignoreUrls[method]) {
    if (path.startsWith(element)) {
      return true;
    }
  }
  return false;
};

/**
 *  It'll return the token without the Bearer string.
 *
 * @param authHeader string with the token
 *
 */
export function splitToken (authHeader: string) {
  let token = "";
  if (authHeader?.startsWith(BEARER)) {
    token = authHeader.slice(BEARER.length);
  }
  return token
};

/**
 *  It'll return an error response if the token is expired or unverified.
 *
 * @param res Object
 * @param decodedTokenWithoutVerification Object with the decoded token
 *
 */
export function errorResponseForUnverifiedToken (res: any, decodedTokenWithoutVerification: any) {
  if (decodedTokenWithoutVerification.v) {
    return errorResponse(res, EXPIRED_TOKEN);
  }
  return errorResponse(res, UNAUTHORIZED_TOKEN);
};
