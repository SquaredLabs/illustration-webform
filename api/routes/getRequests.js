const { Router } = require("express")
var fs = require("fs")
var path = require("path")

const router = Router()

const getOrders = require("../../lib/DBHandler").getOrders
const getOrder = require("../../lib/DBHandler").getOrder
const getContract = require("../../lib/DBHandler").getContract

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
router.get("/getContract/:WO", function (req, res, next) {
    let WO = parseInt(req.params.WO);
    if (WO === NaN) { return res.end(`Invalid WO: ${WO}`) }
    getContract(WO, (err, requests) => {
        res.json(requests)
    })
})

module.exports = router
