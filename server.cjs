const express = require('express')
const app = express()
const port = process.env.PORT | 5000
const path = require('path')

const buildPath = path.join(__dirname, 'dist')

app.use(express.static(buildPath))
app.use(express.json())

app.listen(port, () => console.log(`Listen on port ${port}`))

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
})