const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mailchimp = require('@mailchimp/mailchimp_marketing')

const app = express()
const PORT = 5000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
dotenv.config()

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us10',
})

const signUpFile = `${__dirname}/src/html/signup.html`
const successFile = `${__dirname}/src/html/success.html`
const failureFile = `${__dirname}/src/html/failure.html`

app.get('/', (req, res) => {
  res.sendFile(signUpFile)
})

app.post('/', (req, res) => {
  const { name, email, phone } = req.body

  const listId = process.env.MAILCHIMP_LIST_ID

  const [firstName = '', lastName = ''] = name.split(' ')

  const finalData = {
    email_address: email.trim(),
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName.trim(),
      LNAME: lastName.trim(),
      PHONE: phone.trim(),
    },
  }

  mailchimp.lists
    .addListMember(listId, finalData)
    .then((response) => {
      console.log(response)
      res.sendFile(successFile)
    })
    .catch((err) => {
      console.log(err)
      console.log(err?.response?.text)
      res.sendFile(failureFile)
    })
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
