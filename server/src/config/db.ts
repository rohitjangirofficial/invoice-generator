import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Connected to MongoDB")
    );

    mongoose.connection.on("error", (err) => {
      console.log("Error connecting to MongoDB", err);
    });

    const conn = await mongoose.connect(config.mongoURI as string);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
