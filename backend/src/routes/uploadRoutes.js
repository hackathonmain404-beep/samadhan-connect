const express = require('express');
const { uploadFile } = require('../controllers/uploadController');
const upload = require('../middleware/upload');

const router = express.Router();

// Accepts single file 'file' or multiple files 'files'
router.post(
  '/',
  (req, res, next) => {
    // Dynamically handle single or array uploads
    upload.array('files', 10)(req, res, function (err) {
      if (err) return next(err);
      if (!req.files || req.files.length === 0) {
        // Try single file 'file'
        return upload.single('file')(req, res, next);
      }
      next();
    });
  },
  uploadFile
);

module.exports = router;
