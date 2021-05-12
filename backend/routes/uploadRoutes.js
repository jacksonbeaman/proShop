import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// validate the type of image or extension
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  // .test() will give us a true or false
  // check if original file extension matches one of the filetype extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check if mimetype containes one of the filetype extenstions
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // pass in null for the error
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// uploadRoutes.js will be connected to api/upload
// pass in upload / multer as middleware
// when we upload on the frontend we will want to call it image
router.post('/', upload.single('image'), (req, res) => {
  // we send the final file storage path back to the front end, so it can be stored in our state, and ultimately in the database
  console.log('file uploaded');
  res.send(`/${req.file.path}`);
});

export default router;
