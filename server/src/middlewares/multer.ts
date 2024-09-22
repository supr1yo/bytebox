import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import path  from 'path';
import crypto from 'crypto';
import { DB_NAME } from "../utils/constants";
const MONGODB_URI = process.env.MONGODB_URI;


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         // get the file extension
//         let extArray = file.mimetype.split("/");
//         let extension = extArray[extArray.length - 1];

//       cb(null, file.fieldname + '-' + Date.now()+ '.' +extension);
//     }
//   });


const storage = new GridFsStorage({
  url: `${MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`,
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


export const upload = multer({ storage: storage });