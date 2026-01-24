import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.DATABASE_URL as string;
    
    await mongoose.connect(uri);

    console.log("connect!!! MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting MongoDB Atlas:", error);
  }
};

export default connectDB;