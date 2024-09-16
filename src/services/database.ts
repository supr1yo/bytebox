import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI in .env file.");
}
 
const database = async () =>{
  try {
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`, { bufferCommands: false }).then(() => {
        console.log("Connected to MongoDB");
      });
  } catch (error) {
    console.log(error);
  }
}

export default database;
