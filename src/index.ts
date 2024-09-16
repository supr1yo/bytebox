import compression from "compression";

const express = require('express');
const { createServer } = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const PORT = process.env.PORT || 8080;
const app = express();


// Use middlewares
app.use(cors({
    credentials: true
}));
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

const server = createServer(app);




server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})