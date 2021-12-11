require('dotenv').config()

const {AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ARN, AWS_ACCESS_KEY, AWS_SECRET_KEY} = process.env

module.exports = {
    AWS_BUCKET_NAME, 
    AWS_BUCKET_REGION, 
    AWS_ARN, 
    AWS_ACCESS_KEY, 
    AWS_SECRET_KEY
}