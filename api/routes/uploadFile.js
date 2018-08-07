const { Router } = require("express")
const uploader = require('../../lib/DBHandler').attachFiles
const path = require('path')
const fs = require('fs');

const router = Router()

/* GET users listing. */
router.post("/uploadFile", function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    let fileObj = req.files;
    let wo = req.body.wo
    let file = fileObj[Object.keys(fileObj)[0]]
    let directory = path.resolve(__dirname, `../../datastore/WO${wo}/`)
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    file.mv(directory+'/'+file.name)
})

module.exports = router
