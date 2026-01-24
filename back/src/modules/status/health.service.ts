import mongoose from "mongoose";

export const checkDatabaseHealth = async () => {
  const state = mongoose.connection.readyState;
  return state === 1;
};