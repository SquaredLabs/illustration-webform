const path = require('path')
var sqlite3 = require("sqlite3").verbose()
var db = new sqlite3.Database(path.resolve(__dirname,"../datastore/Requests.db"))
start()

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

function start() {
  db.serialize(function () {
    console.log('serializing')
    db.run(
      "CREATE TABLE IF NOT EXISTS requests (wo_number INTEGER PRIMARY KEY AUTOINCREMENT, \
        cover INTEGER, description varchar(2048), deadline INTEGER, deadlineDate varchar(20), \
        journalName varchar(128), contactName varchar(256), contactEmail varchar(256), \
        contactPhone varchar(256), KFS varchar(512), status INTEGER , article varchar(512), \
      reference varchar(512), additional varchar(512), original varchar(512));"
    )
  })
}

function newOrder(data, callback) {
  try {
    start()
    db.run("INSERT INTO requests (wo_number, cover, description, deadline, deadlinedate, \
      journalname, contactName, contactEmail, contactPhone, KFS, status) \
      VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0);", data.cover,
      data.description, data.deadline, data.deadlineDate, data.journalName, data.contactName,
      data.contactEmail, data.contactPhone, data.KFS)
    db.get("SELECT MAX(wo_number) FROM requests;", (err, row) =>
      callback(err, row["MAX(wo_number)"])
    )
  } catch (e) {
    console.error(e)
  }
}
function attachFile(type, filePath, WO, callback) {
  try {
    db.run(("UPDATE requests SET "+type+" = ? WHERE wo_number = ?;"), filePath, WO, callback)
  } catch (e) {
    console.error(e)
  }
}
function getFiles(WO, callback) {
  try {
    db.all("SELECT URL FROM FILES WHERE WO_NUMBER=?;", WO, callback)
  } catch (e) {
    console.error(e)
  }
}

function getOrder(WO, callback) {

}
function getOrders(callback) {
  db.all("SELECT * FROM requests;", (err, row) =>
    callback(err, row)
  )
}

module.exports = {newOrder, attachFile, getOrders}
