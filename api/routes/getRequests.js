const { Router } = require("express")
var fs = require("fs")
var path = require("path")

const router = Router()

const getOrders = require("../../lib/DBHandler").getOrders

router.get("/getRequests", function (req, res, next) {
    getOrders((err, requests) => {
        res.json(requests)
    })
})
router.get('/getFile/:WO/:name', function (req, res, next) {
    let joined = path.join(__dirname, '../../datastore/', req.params.WO, '/', req.params.name)
    let file = path.resolve(joined)
    res.sendFile(file)
})

module.exports = router
