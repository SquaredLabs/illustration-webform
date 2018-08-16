const { Router } = require("express")
var fs = require("fs")
var path = require("path")

fs.writeFile(
  path.join(__dirname, "../../datastore/Requests.db"),
  "",
  { flag: "wx" },
  function(err) {
    if (err) console.log(err)
    else console.log("Created Requests.db")
  }
)

const router = Router()

const newOrder = require("../../lib/DBHandler").newOrder
const draftContract = require("../../lib/DBHandler").draftContract
const signContract = require("../../lib/DBHandler").signContract
const emailer = require("../../lib/Emailer")
const verifyForm = require("../../lib/VerifyFormC").default

router.post("/submit", function(req, res) {
  let data = req.body
  let errMsg = verifyForm(data)
  
  if (errMsg != 0) {
    console.error(errMsg)
    res.send(errMsg)
    return
  }

  newOrder(data, (err, max) => {
    if (err) console.error(err)
    data.WorkOrderNumber = max
    emailer(data)
    res.send({
      status:1,
      text: `Success! Submitted Illustratoion Request ${max}. \
      You will get a confirmation email for your request.`,
      wo: max
    })
  })
})

router.post("/approve", function (req, res) {
  let data = req.body
  let errMsg = verifyForm(data, 'approve')
  if (errMsg != 0) {
    console.error(errMsg)
    res.send(errMsg)
    return
  }

  draftContract(data, (err, response) => {
    if (err) console.error(err)
    emailer(data)
    res.send({
      status: 1,
      text: `Success! Approved Request ${data.wo}. \
      ${data.contactEmail} will get a confirmation email for your request.`,
      wo: data.wo
    })
  })
})

router.post("/sign", function (req, res) {
  let data = req.body
  let errMsg = verifyForm(data, 'sign')
  if (errMsg != 0) {
    console.error(errMsg)
    res.send(errMsg)
    return
  }

  signContract(data, (err, response) => {
    if (err) console.error(err)
    emailer(data)
    res.send({
      status: 1,
      text: `Success! You have signed off on request ${data.wo}.`,
      wo: data.wo
    })
  })
})

module.exports = router
