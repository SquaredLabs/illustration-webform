const express = require("express")
const bodyParser = require("body-parser")
const session = require('express-session')

// Create express instnace
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'illust-netid',
  resave: false,
  saveUninitialized: true,
}))

// Require API routes
const submit = require("./routes/submit")
const login = require("./routes/login")

// Import API Routes
app.use(submit)
app.use(login)

// Export the server middleware
module.exports = {
  path: "/api",
  handler: app
}
