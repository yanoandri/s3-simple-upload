const { S3UploadService } = require('../services/s3-upload')
const util = require('util')
const fs = require('fs');
const { FileStorageService } = require('../services/files-storage');

const s3UploadService = new S3UploadService;
const fileStorageService = new FileStorageService;
const unlinkFile = util.promisify(fs.unlink)
const upload = async (req, res) => {
    const response = await s3UploadService.upload(req.file)
        .catch(err => {
            return res.status(500).send({
                message: 'Fail',
                data: err
            })
        });
    const fileStorage = await fileStorageService.getFileStorageByFilter({tag: response.ETag})
    const fileHistory = fileStorage && fileStorage.history ? fileStorage.history : []
    //update log response
    fileHistory.push(response)
    if (fileStorage) {
        await fileStorageService.update({ tag: response.ETag }, {
            name: response.key,
            url: response.Location,
            path: response.Bucket,
            tag: response.ETag,
            history: fileHistory
        }).catch(err => {
            return res.status(500).send({
                message: 'Failed to update data',
                data: err
            })
        })
    } else {
        await fileStorageService.create({
            name: response.key,
            url: response.Location,
            path: response.Bucket,
            tag: response.ETag,
            history: fileHistory
        }).catch(err => {
            return res.status(500).send({
                message: 'Failed to create data',
                data: err
            })
        })
    }
   

    await unlinkFile(req.file.path)
    return res.status(201).send({
        message: 'Data uploaded successfully',
        data: response
    });
}

const remove = async (req, res) => {
    const { id } = req.params
    const fileStorage = await fileStorageService.getFileStorageById(id)
    if (fileStorage) {
        await s3UploadService.remove(fileStorage.name)
        await fileStorageService.remove({ _id: id });
        return res.status(200).send({message: 'delete successful'})
    }
    return res.status(404).send({message: 'delete unsuccessful'})
}

const getFile = async (req, res) => {
    const { id } = req.params
    const response = await fileStorageService.getFileStorageById(id);
    return res.status(200).send({message: 'success', data: fileStorageService.mapFileStorage(response)})
}

module.exports = {
    upload,
    remove,
    getFile,
}