const express = require("express")
const session = require('express-session')
const cookieParser = require('cookie-parser')

// Create express instnace
const app = express()

app.use(cookieParser())

app.use(session({
    secret: 'illust-netid',
    resave: false,
    saveUninitialized: true,
}))

// Require API routes
const login = require("./routes/login")
app.use(login)


// Export the server middleware
module.exports = {
    path: "/",
    handler: app
}
