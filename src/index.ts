import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import database from './services/database';
// import multer from 'multer';
import compression from 'compression';


const PORT = process.env.PORT;
const app = express();


// Use middlewares
app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(express.json());

const server = createServer(app);



database().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error: any) => {
    console.log("MONGO db connection failed !!! ", error);
});