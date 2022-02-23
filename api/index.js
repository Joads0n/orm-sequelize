const express = require('express');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const port = 3000

app.get('/test', (req, res) => {
    res.status(200)
    res.send({message: 'Boas-vindas à API'})
})

app.listen(port, () => {
    console.log(`SERVER ON IN PORT ${port}`)
})

module.exports = app