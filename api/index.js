const express = require("express")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload');

// Create express instnace
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());

// Require API routes
const submit = require("./routes/submit")
const uploadFile = require("./routes/uploadFile")
const getRequests = require("./routes/getRequests")

// Import API Routes
app.use(submit)
app.use(uploadFile)
app.use(getRequests)

// Export the server middleware
module.exports = {
  path: "/api",
  handler: app
}
