const { Router } = require("express")
var fs = require("fs")
var path = require("path")

const router = Router()

const getOrders = require("../../lib/DBHandler").getOrders
const getOrder = require("../../lib/DBHandler").getOrder
const getContract = require("../../lib/DBHandler").getContract
const decryptWO = require('../../lib/CryptoHandler').decryptWO
const encryptWO = require('../../lib/CryptoHandler').encryptWO

router.get("/getRequests", function (req, res, next) {
    getOrders((err, requests) => {
        res.json(requests)
    })
})

router.get("/getRequest/:WO", function (req, res, next) {
    let WO = parseInt(req.params.WO);
    if(WO === NaN) {return res.end(`Invalid WO: ${WO}`)}
    getOrder(WO, (err, requests) => {
        res.json(requests)
    })
})

router.get('/getFile/:WO/:name', function (req, res, next) {
    let joined = path.join(__dirname, '../../datastore/', req.params.WO, '/', req.params.name)
    let file = path.resolve(joined)
    res.sendFile(file)
})

router.get("/getContract/:WOENC", function (req, res, next) {
    let WOENC = req.params.WOENC;
    decryptWO(WOENC).then((decrypted) => {
        let WO = parseInt(decrypted)
        if (WO === NaN) { return res.end(`Invalid WO: ${WO}`) }
        getContract(WO, (err, requests) => {
            res.json(requests)
        })
    })
})

router.get("/getEncryptedWO/:WO", function (req, res, next) {
    let WO = req.params.WO.toString()
    let WOnum = parseInt(req.params.WO)
    if (WOnum === NaN) { return res.end(`Invalid WO: ${WO}`) }
    encryptWO(WO).then((encyrpted) => {
        res.end(encyrpted)
    })
})

router.get("/getDecryptedWO/:ENCWO", function (req, res, next) {
    let ENCWO = req.params.ENCWO.toString()
    decryptWO(ENCWO).then((decrypted) => {
        res.end(decrypted)
    })
})

module.exports = router
