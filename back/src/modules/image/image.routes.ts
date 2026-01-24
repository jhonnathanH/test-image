import { Request, Response, Router } from "express";
import multer from "multer";

import customResponse from "../../utils/response/customResponse";
import errorResponse from "../../utils/response/errorResponse";
import { getImages, handleImage, removeImage } from "./image.controller";
import { StatusCodeTypes } from "../../types/statusCodeTypes";

const router = Router();
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

/**
 * get all images
 * return Promise<data>
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await getImages();
    customResponse(res, StatusCodeTypes.OK, data);
  } catch (error) {
    console.error("error", error);
    errorResponse(res, error);
  }
});


/** 
 * remove image by id
 * return Promise<data>
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await removeImage(id);
    customResponse(res, StatusCodeTypes.OK, data);
  } catch (error) {
    console.error("error", error);
    errorResponse(res, error);
  }
});

// multer
router.post("/analyze", upload.single("image"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return errorResponse(res, new Error("No file uploaded"));
    }
    const file = req.file;
    const data = await handleImage(file, req);
    customResponse(res, StatusCodeTypes.CREATED, data);
  } catch (error) {
    console.error("error", error);
    errorResponse(res, error);
  }
});

export default router
