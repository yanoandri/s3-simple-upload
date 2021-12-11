const s3UploadRouter = require('./s3-upload')

setupRoutes = (app) => {
    app.use('/api/s3', s3UploadRouter)
}

module.exports = {
    setupRoutes
}