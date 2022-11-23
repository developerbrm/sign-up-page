const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')

const app = express()
const PORT = 5000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

const signUpFile = `${__dirname}/src/html/signup.html`
const successFile = `${__dirname}/src/html/success.html`
const failureFile = `${__dirname}/src/html/failure.html`

app.get('/', (req, res) => {
  res.sendFile(signUpFile)
})

// app.get('/success', (req, res) => {
//   res.sendFile(successFile)
// })

// app.get('/failure', (req, res) => {
//   res.sendFile(failureFile)
// })

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`)
})
