require("dotenv").config()
const express = require("express")
const Cas = require('cas-authentication');
const CASOPTS = {
    cas_url: 'https://login.uconn.edu/cas',
    service_url: process.env.URL,
    cas_version: '2.0',
    renew: true,
    session_name: 'netid',
}

const cas = new Cas(CASOPTS)

const router = express()
const isAdmin = require('../../lib/DBHandler').isAdmin

router.get('/logout', (req, res, next) => {
    cas.logout(req, res, next)
    res.redirect('/')
})

const authBlocked = (path) => {
    let paths = ['/getRequests', '/getFile', '/getRequest', '/approve']
    for (let blockedPath of paths) if (path.includes(blockedPath)) return true
}

const authBounced = (path) => {
    let paths = ['/admin', '/approvalForm' ]
    for (let blockedPath of paths) if (path.includes(blockedPath)) return true
}

router.use(async (req, res, next) => {
    let blocked = authBlocked(req.path)
    let bounced = authBounced(req.path)

    if (!req.session.netid) {
        res.cookie('user', null)
    }

    if (blocked || bounced) {
        if (req.session.netid) {
            isAdmin(req.session.netid, (err, valid) => {
                if (!valid) {
                    res.end(`${req.session.netid} is not authorized`)
                }
                else return next()
            })
        }
        else {
            if (blocked) cas.block(req, res, next)
            else if (bounced) cas.bounce(req, res, next)
        }
    }
    
    else next() 
})

module.exports = router
