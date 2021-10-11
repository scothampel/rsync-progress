const express = require('express')
const path = require('path')

// ENV config
require('dotenv').config({ path: path.join(__dirname, './.env') });

// Environment vars and defaults
const {
  PORT = 3001
} = process.env

// Express
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Static front-end
app.use(express.static(path.join(__dirname, '../client/build')))

// Routes

// GET transfers
app.get('/transfers', (req, res) => {

})
// DELETE transfer
app.delete('/transfer/:id', (req, res) => {

})

// GET wildcard, return static index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})
// ALL wildcard, 404 undefined
app.all('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})