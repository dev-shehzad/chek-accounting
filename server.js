const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Enable CORS
app.use(cors());

// Set CSP headers to allow Google Fonts
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com;"
  );
  next();
});

// Serve static files from 'uploads' directory
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

// API endpoint for uploading the logo image
app.post('/api/upload', upload.single('logoFile'), (req, res) => {
  try {
    console.log('Form data:', req.body); // Non-file form data
    console.log('Uploaded file:', req.file); // File data

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    // Construct the URL of the uploaded image
    const imageUrl = `http://localhost:3003/uploads/${req.file.filename}`;

    // Respond with success message and image URL
    res.json({
      success: true,
      message: 'Logo uploaded successfully',
      fileUrl: imageUrl, // Send the local image URL in response
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Start the server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
