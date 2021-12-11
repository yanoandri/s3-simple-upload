const express = require('express')
const S3UploadController = require('../controllers/s3-upload')
const { imageUpload } = require('../middleware/multer')
const router = express.Router()

router.post('/upload', imageUpload.single('image'), S3UploadController.upload)

module.exports = router