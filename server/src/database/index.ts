import mongoose from "mongoose";
import Grid from 'gridfs-stream';
import { DB_NAME } from "../utils/constants";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI in .env file.");
}
 
const database = async () =>{
  try {
    // await mongoose.connect(`${MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`, { bufferCommands: false }).then(() => {
    //     console.log("Connected to MongoDB");
    //   });
     

    // Create a connection to MongoDB
    const conn = mongoose.createConnection(`${MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`);

    // Initialize GridFS stream
    let gfs;

    conn.once('open', () => {
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('uploads');
      console.log('MongoDB connected.');
    });
  } catch (error) {
    console.log(error);
  }
}

export default database;
