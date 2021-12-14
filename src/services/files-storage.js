const FileModel = require('../database/models/file-storage')
class FileStorageService {
    async create(data) {
        return FileModel.create(data)
    }

    async getFileStorageById(id) {
        return FileModel.findById({_id: id})
    }

    async getFileStorageByFilter(data) {
        return FileModel.findOne(data)
    }

    async update(filter, data) {
        return FileModel.findOneAndUpdate(filter, data)
    }

    async remove(data) {
        return FileModel.deleteOne(data)
    }

    mapFileStorage(data) {
        return {
            id: data._id,
            name: data.name,
            tag: data.tag,
            url: data.url,
            history: data.history,
            created: data.createdAt,
            updated: data.updatedAt
        }
    }
}

module.exports = {FileStorageService}