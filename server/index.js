const express = require('express')
const path = require('path')
const fs = require('fs')

// ENV config
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Environment vars and defaults
const {
  PORT = 3001,
  TRANSFER_DIR = path.join(__dirname, 'transfers'),
  COMPLETE_DIR = path.join(__dirname, 'transfers/complete')
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
  // Current transfers
  let current_transfers = {}
  try {
    // Read transfer dir
    const files = fs.readdirSync(TRANSFER_DIR)
    files.forEach(file => {
      // Read each file in dir
      const file_path = path.join(TRANSFER_DIR, file)
      const data = fs.readFileSync(file_path, 'utf-8').split(/\n/)

      // Construct file list and current progress
      const file_list = []
      const file_prog = []
      data.forEach((v, i) => {
        // Check if line is a file name, or a progress indicator
        const file_name = (v.match(/\.[a-z]+[0-9]{0,}$/) || [])[0]
        // File name if regex matches
        if (file_name !== undefined) file_list.push(v)
        // Progress indicator if previous entry was a file name
        else if (data[i - 1] === file_list[file_list.length - 1] && data[i - 1] !== undefined) {
          // Only include latest progress update
          const prog = v.split(/\r/)
          file_prog.push(prog[prog.length - 1])
        }
      })

      // Add to currently active transfers array
      current_transfers[file] = { file_list, file_prog }
    })
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err)
  }

  // Complete transfers


  res.json(current_transfers)
})
// DELETE transfer
app.delete('/transfer/:name', (req, res) => {

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