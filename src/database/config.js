const mongoose = require('mongoose')
const { MONGO_URL } = require('../config')

mongoose
    .connect(MONGO_URL, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
        throw e
    })

const db = mongoose.connection

module.exports = db