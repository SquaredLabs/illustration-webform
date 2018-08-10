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
const emailer = require("../../lib/Emailer")
const verifyForm = require("../../lib/VerifyFormC")

/* GET users listing. */
router.post("/submit", function(req, res) {
  let data = req.body
  let errMsg = verifyForm(data)
  console.log(errMsg)
  if (errMsg != 0) {
    res.send(errMsg)
    return
  }

  newOrder(data, (err, max) => {
    if (err) console.error(err)
    data.WorkOrderNumber = max
    emailer(data)
    res.send({
      status:1,
      text: `Success! Submitted Illustratoion Request ${max} \
      You will get a confirmation email for your request.`,
      wo: max
    })
  })
})

module.exports = router
