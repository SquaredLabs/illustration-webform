const { Router } = require("express")

const router = Router()

/* GET users listing. */
router.post("/uploadFile", function (req, res) {
    let data = req.body
    let errMsg = verifyForm(data)
    console.log(errMsg)
    if (errMsg != 0) {
        res.send(errMsg)
        return
    }

    dbHandler((err, max) => {
        if (err) console.error(err)
        data.WorkOrderNumber = max
        emailer(data)
        res.send("Success! You will get a confirmation email for your work order.")
    })
})

module.exports = router
