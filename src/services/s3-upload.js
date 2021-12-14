const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const { AWS_ACCESS_KEY, AWS_BUCKET_REGION, AWS_SECRET_KEY, AWS_BUCKET_NAME } = require('../config')

class S3UploadService {
    constructor() {
        this.S3 = new S3({
            region: AWS_BUCKET_REGION,
            accessKeyId: AWS_ACCESS_KEY,
            secretAccessKey: AWS_SECRET_KEY
        });
    }

    async upload(file) {
        const fileStream = fs.createReadStream(file.path);
        return this.S3.upload({
            Bucket: AWS_BUCKET_NAME,
            Body: fileStream,
            Key: file.filename
        }).promise();
    }

    async remove(filename) {
        return this.S3.deleteObject({
            Bucket: AWS_BUCKET_NAME,
            Key: filename
        }).promise();
    }
}

module.exports = { S3UploadService }