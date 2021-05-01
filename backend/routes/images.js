const express = require('express');
const imageController = require('../controllers/image');
const imageUploader = require('../middleware/image-upload');
const checkAuth = require('../middleware/auth');

const router = express.Router();

router.post('/upload', checkAuth, imageUploader.upload.single('image'), imageController.upload);

module.exports = router;
