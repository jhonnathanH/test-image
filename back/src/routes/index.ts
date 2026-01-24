import { Application } from "express";
import healthRouter from "../modules/status/health.routes";
import imageRouter from "../modules/image/image.routes";

const routes = async (app: Application) => {
    //app.use(authMiddleware);
    app.use(`/status`, healthRouter);
    app.use(`/images`, imageRouter);
};
  
export default routes;
