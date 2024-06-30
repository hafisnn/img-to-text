const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/generate/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    Tesseract.recognize(
        req.file.buffer,
        'eng',
        {
            logger: m => console.log(m),
        }
    ).then(({ data: { text } }) => {
        res.json({ text });
    }).catch(err => {
        res.status(500).send('Error processing image');
    });
});

module.exports = router;
