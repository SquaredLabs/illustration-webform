const express = require("express")
const bodyParser = require("body-parser")

// Create express instnace
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Require API routes
const submit = require("./routes/submit")

// Import API Routes
app.use(submit)

// Export the server middleware
module.exports = {
  path: "/api",
  handler: app
}
