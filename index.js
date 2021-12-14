const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./src/router')
const db = require('./src/database/config')
const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

router.setupRoutes(app)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))