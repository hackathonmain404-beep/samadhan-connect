// @desc    Upload single or multiple files
// @route   POST /api/upload
// @access  Private / Public
const uploadFile = (req, res, next) => {
  try {
    if (!req.file && (!req.files || req.files.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Please select a file to upload'
      });
    }

    if (req.file) {
      const fileUrl = `/uploads/${req.file.filename}`;
      return res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        url: fileUrl,
        file: {
          url: fileUrl,
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size
        }
      });
    }

    if (req.files && req.files.length > 0) {
      const files = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      }));

      return res.status(200).json({
        success: true,
        message: `${files.length} files uploaded successfully`,
        url: files[0].url,
        files
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile
};
