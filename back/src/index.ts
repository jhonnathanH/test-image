// @ts-ignore
import { Server } from "./server";

declare global {
  var buildVersion: string;
  var settings: any;
  var queueVersion: string;
  var environmentVariables: any;
  var mongoose: any;
}

global.buildVersion = "1.0.0";
global.queueVersion = `-v${buildVersion}`;

const server = new Server();
server.build().then(() => {
  server.listen();
  console.log("Server is running");
}).catch((error) => {
  console.log(error);
});
