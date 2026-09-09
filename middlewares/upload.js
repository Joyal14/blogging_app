const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = new Set(['.jpeg', '.jpg', '.png', '.gif', '.webp']);
    const extension = path.extname(file.originalname).toLowerCase();
    const hasImageMimeType = file.mimetype.startsWith('image/');
    const hasGenericMimeType = file.mimetype === 'application/octet-stream';

    if (allowedExtensions.has(extension) && (hasImageMimeType || hasGenericMimeType)) {
      return cb(null, true);
    }

    cb(new Error('Only JPG, JPEG, PNG, GIF, and WebP image files are allowed'));
  }
});

module.exports = upload;