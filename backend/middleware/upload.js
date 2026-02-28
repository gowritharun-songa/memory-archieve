import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cd(new Error("Only image file type is allowed"));
    }
  }
});

const uploadImage = upload.single('image');
export default uploadImage;