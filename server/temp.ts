const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const crypto = require('crypto');

// Create an Express app
const app = express();

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/mydatabase';

// Create a connection to MongoDB
const conn = mongoose.createConnection(mongoURI);

// Initialize GridFS stream
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create a storage engine for multer to use GridFS
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// Route to upload a file
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

// Route to get the file by filename
app.get('/file/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }

    // File exists, stream it to the response
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

// Route to delete a file by filename
app.delete('/file/:filename', (req, res) => {
  gfs.remove({ filename: req.params.filename, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    res.json({ success: true });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});