const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FileStorage = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    path: { type: String, required: true },
    tag: { type: String, required: true },
    history: {type: Array}
}, {timestamps: true, toJSON: true})

module.exports = mongoose.model('FileStorage', FileStorage)