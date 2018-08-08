const express = require("express")
const Cas = require('cas-authentication');
const CASOPTS = {
    cas_url: 'https://login.uconn.edu/cas',
    service_url: process.env.NODE_ENV === "development" ?
        'http://localhost:3000' : process.env.URL,
    cas_version: '2.0',
    renew: true,
    session_name: 'netid',
}

const cas = new Cas(CASOPTS)

const router = express()

router.get('/logout', (req, res, next) => {
    cas.logout(req, res, next)
    res.redirect('/')
})

const authBlocked = (path) => {
    let paths = ['/getRequests', '/getFile']
    for (let blockedPath of paths) if (path.includes(blockedPath)) return true
}

const authBounced = (path) => {
    let paths = ['/admin']
    for (let blockedPath of paths) if (path.includes(blockedPath)) return true
}

router.use(async (req, res, next) => {
    if (!req.session.netid) {
        res.cookie('user', null)
    }
    if (authBlocked(req.path)) cas.block(req, res, next)
    else if (authBounced(req.path)) cas.bounce(req, res, next)
    else next()
})

module.exports = router
