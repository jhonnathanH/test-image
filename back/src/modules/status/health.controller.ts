import { checkDatabaseHealth } from "./health.service";

export const getStatus = async () => {
  return checkDatabaseHealth()
    .then((dbReady) => {
      return {
        status: "ok",
        dbReady,
        version: global.buildVersion
      }
    })
    .catch((error) => {
      console.error(error);
      return {
        status: "ok",
        dbReady: false,
        version: global.buildVersion
      }
    });
}

