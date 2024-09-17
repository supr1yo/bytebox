import express from 'express';
const PORT = process.env.PORT;
const app = express();
import { createServer } from 'http';
import cors from 'cors';
import database from './database';
// import multer from 'multer';


// Import user routers
import signup from './routes/user/signup';
import login from './routes/user/login';

// Import file routers
import image from './routes/file/image';





// Use middlewares
app.use(cors({
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const server = createServer(app);

// Use the routes
app.use('/', signup);
app.use('/', login);
app.use('/', image);


database().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error: any) => {
    console.log("MONGO db connection failed !!! ", error);
});