import express, { Application } from "express";
import router from "./routes";
import cors from "cors";
import config from "./config";
import requestListener from "./utils/requestListener";
import { errorHandler } from "./middlewares";

export class Server {
  private readonly app: Application;

  constructor () {
    this.app = express();

    const corsOptions = {
      origin: "*"
    };
    this.app.use(cors(corsOptions));
  }

  async build (): Promise<void> {
    await this.configurationLoader()
    await this.middlewares();
    await this.routes();
  }

  listen (): void {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  async configurationLoader (): Promise<void> {
    await config();
  }

  async routes () {
    await router(this.app);
    this.app.use(errorHandler);
  }

  async middlewares () {
    this.app.use(requestListener);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.get("/favicon.ico", function (_req, res) {
      res.status(204);
      res.end();
    });
  }

}
