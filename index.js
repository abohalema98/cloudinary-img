// Description: This is the main file of the project
const exprress = require('express');
const app = exprress();
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const multer = require('multer');
const cloudinary = require('cloudinary').v2;


// Configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});



// Multer File upload settings
const DIR = './public';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + file.originalname.toLowerCase().split(' ').join('-');
        cb(null, filename);
    }
});
const upload = multer({ storage: storage });


// Configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(exprress.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Upload image to cloudinary
app.post('/upload', upload.single('image'), async (req, res) => {

    // Configure cloudinary options
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        if (!req.file) {
            res.status(400).send('No image file provided.');
            return;
        }

        const result = await cloudinary.uploader.upload(req.file.path, options);
        res.json({ url: result.url });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
}); 