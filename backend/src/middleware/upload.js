const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage engine configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const sanitizedExt = path.extname(file.originalname).toLowerCase();
    const baseName = path
      .basename(file.originalname, sanitizedExt)
      .replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${baseName}-${uniqueSuffix}${sanitizedExt}`);
  }
});

// File filter for images, documents, presentations, videos
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [
    // Images
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
    // Documents
    '.pdf', '.doc', '.docx', '.txt', '.rtf',
    // Presentations / Spreadsheets
    '.ppt', '.pptx', '.xls', '.xlsx', '.csv',
    // Videos
    '.mp4', '.mkv', '.mov', '.avi', '.webm'
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Unsupported file type (${ext}). Allowed types: Images (JPG, PNG, WebP), PDFs, DOC/DOCX, PPT/PPTX, Videos (MP4, WebM).`
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB max limit
  },
  fileFilter: fileFilter
});

module.exports = upload;
