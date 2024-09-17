import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        // get the file extension
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];

      cb(null, file.fieldname + '-' + Date.now()+ '.' +extension);
    }
  });

export const upload = multer({ storage: storage });