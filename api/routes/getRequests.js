const { Router } = require("express")
var fs = require("fs")
var path = require("path")

const router = Router()

const getOrders = require("../../lib/DBHandler").getOrders

/* GET users listing. */
router.get("/getRequests", function (req, res, next) {
    
    /*
      cover: false,
      description: "",
      deadline: false,
      deadlineDate: "",
      journalName: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      KFS: ""
      */

    getOrders((err, requests) => {
        res.json(requests)
    })
    
})

module.exports = router
