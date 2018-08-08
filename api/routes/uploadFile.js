const { Router } = require("express")
const uploader = require('../../lib/DBHandler').attachFile
const path = require('path')
const fs = require('fs');

const router = Router()
//article varchar(128), reference varchar(128), additional varchar(128), original varchar(128));
const validateType = type =>
    ['article', 'reference', 'additional', 'original'].includes(type)

/* GET users listing. */
router.post("/uploadFile", function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let fileObj = req.files;
    let wo = req.body.wo
    let type = req.body.type
    if(!validateType(type)) res.end('Invalid type: '+ type)
    let file = fileObj[Object.keys(fileObj)[0]]
    let directory = path.resolve(__dirname, `../../datastore/WO${wo}/`)
    let filePath = directory+'/'+file.name

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    file.mv(filePath)

    uploader(type, `WO${wo}/${file.name}`, wo, ()=>{res.end('Uploaded '+file.name)})
})

module.exports = router
