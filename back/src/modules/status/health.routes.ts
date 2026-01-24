import { Request, Response, Router } from "express";

import customResponse from "../../utils/response/customResponse";
import errorResponse from "../../utils/response/errorResponse";
import { getStatus } from "./health.controller";
import { StatusCodeTypes } from "../../types/statusCodeTypes";

const router = Router();

/**
 * get test
 * return Promise<data>
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await getStatus();
    customResponse(res, StatusCodeTypes.OK, data);
  } catch (error) {
    console.error("error", error);
    errorResponse(res, error);
  }
});

export default router
