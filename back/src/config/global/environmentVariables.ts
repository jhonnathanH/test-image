import dotenv from "dotenv";
dotenv.config();


export default {
  isLocal: (process.env.NODE_ENV === "local"),
  NODE_ENV: String(process.env.NODE_ENV),
  PORT: Number(process.env.PORT),
  WEB_HOST: String(process.env.WEB_HOST),
  DATABASE_URL: String(process.env.DATABASE_URL),
  SUPABASE_URL: String(process.env.SUPABASE_URL),
  SUPABASE_KEY: String(process.env.SUPABASE_KEY)
};