import connectDB from "./global/database";
import environmentVariables from "./global/environmentVariables";

export default async () => {
    global.environmentVariables = environmentVariables;
    global.mongoose = await connectDB();
}

/*
const loadRedis = async () => {
  await redis()
}

 */
