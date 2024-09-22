import mongoose from "mongoose";
import Grid from 'gridfs-stream';
import { DB_NAME } from "../utils/constants";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in the .env file.");
}

let gfs: any;

const database = async () => {
  try {
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`, {
      bufferCommands: false, // Disable mongoose buffering
    });

    console.log("Connected to MongoDB.");

    // Initialize GridFS stream after the connection is open
    const db = mongoose.connection.db;
    gfs = Grid(db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('GridFS initialised and running.');

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default database;
