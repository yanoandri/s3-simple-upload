const { S3UploadService } = require('../services/s3-upload')
const util = require('util')
const fs = require('fs')

const s3UploadService = new S3UploadService;
const unlinkFile = util.promisify(fs.unlink)
const upload = async (req, res) => {
    const response = await s3UploadService.upload(req.file)
        .catch(err => {
            return res.status(500).send({
                message: 'Fail',
                data: err
            })
        });

    await unlinkFile(req.file.path)
    return res.status(201).send({
        message: 'Data uploaded successfully',
        data: response
    });
}

module.exports = {
    upload    
}