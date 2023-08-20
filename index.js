const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const app = express();
const cors = require('cors');


// Cors configuration
app.use(cors());


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer configuration for file uploads
const storage = multer.memoryStorage(); // Store uploaded files in memory
const upload = multer({ storage });

// Serve static files from the "public" folder (optional)
app.use(express.static('public'));

// Route for uploading images
app.post('/upload', upload.single('image'), async (req, res) => {
    
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload the image to Cloudinary using a Buffer
        const result = await cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                console.error('Error uploading file:', error);
                return res.status(500).json({ message: 'An error occurred' });
            }

            // Response with Cloudinary image URL
            res.json({ url: result.url });
        }).end(req.file.buffer);

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
