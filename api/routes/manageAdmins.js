const { Router } = require("express")

const router = Router()

const getAdmins = require("../../lib/DBHandler").getAdmins
const addAdmin = require("../../lib/DBHandler").addAdmin
const removeAdmin = require("../../lib/DBHandler").removeAdmin

router.get("/getAdmins", function (req, res, next) {
  getAdmins((err, admins) => {
    res.json(admins)
  })
})
router.get("/addAdmin/:admin", function (req, res, next) {
  let admin = req.params.admin
  if (!admin) { return res.end(`Invalid admin.`) }
  addAdmin(netID, (err, requests) => {
    res.json(requests)
  })
})
router.get("/removeAdmin/:admin", function (req, res, next) {
  let admin = req.params.admin
  if (!admin) { return res.end(`Invalid admin.`) }
  removeAdmin(netID, (err, requests) => {
    res.json(requests)
  })
})


module.exports = router
