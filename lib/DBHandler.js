const path = require('path')
var sqlite3 = require("sqlite3").verbose()
require("dotenv").config()
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
      reference varchar(512), additional varchar(512), original varchar(512) );"
    )
    db.run("CREATE TABLE IF NOT EXISTS admins (netID varchar(9) PRIMARY KEY);")
    db.run("CREATE TABLE IF NOT EXISTS contracts (contract_number INTEGER PRIMARY KEY AUTOINCREMENT, \
      wo_number INTEGER,\
      hours varchar(4),\
      hoursPM varchar(4),\
      draft1 varchar(20),\
      draft2 varchar(20), \
      draft3 varchar(20), \
      contactSig varchar(512), \
      contactDate varchar(20), \
      illustrator varchar(512), \
      illustratorSig varchar(512), \
      illustratorDate varchar(20),\
      FOREIGN KEY(wo_number) REFERENCES requests(wo_number)\
     );")
    addAdmin(process.env.ADMIN, (err, data) => {
      if (err) return console.error(err)
      console.log('Added admin: ' + process.env.ADMIN)
    })
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
    db.run(("UPDATE requests SET " + type + " = ? WHERE wo_number = ?;"), filePath, WO,
      callback)
  } catch (e) {
    console.error(e)
  }
}

function getOrders(callback) {
  db.all("SELECT * FROM requests;", callback)
}

function getOrder(wo, callback) {
  db.get("SELECT * FROM requests where WO_NUMBER=?;",wo, callback)
}

function getAdmins(callback) {
  db.all("SELECT * FROM admins;", callback)
}

function addAdmin(netID, callback) {
  db.run("INSERT OR IGNORE INTO admins (netID) VALUES (?);", netID, callback)
}

function removeAdmin(netID, callback) {
  db.run("DELETE FROM admins WHERE netID = ?;", netID, callback)
}

function isAdmin(netID, callback) {
  db.get("SELECT * FROM admins where netID = ?;",netID, callback)
}

function updateStatus(wo, status, callback) {
  db.run(("UPDATE requests SET status = ? WHERE wo_number = ?;"),
    status, wo, callback)
}

function addContract(data, callback) {
  db.run("INSERT INTO contracts ( \
      wo_number,\
      hours,\
      hoursPM,\
      draft1,\
      draft2, \
      draft3, \
      contactSig, \
      contactDate, \
      illustrator, \
      illustratorSig, \
      illustratorDate) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    data.wo, data.hours, data.hoursPM,
    data.deadline1, data.deadline2, data.deadlineFinal,
    data.contactSig, data.signDate1, data.illustrator, data.illustratorSig,
    data.signDate2, (err, resp) => {
      if(err) console.error(err)
      updateStatus(data.wo, 1, callback)
    })
}

function draftContract(data, callback) {
  getContract(data.wo, (err, contract) => {
    if(err) console.error(err)
    if (contract.length === 0) addContract(data, callback)
    else(callback(`Duplicate contract for WO ${data.wo}`, null))
  })
}

function getContract(wo, callback) {
  db.all("SELECT * FROM contracts WHERE wo_number=?;", wo, callback)
}


function signContract(data, callback) {
  updateStatus(data.wo, 2, console.log)
  db.run("UPDATE CONTRACTS SET contactSig = ?, contactDate = ? WHERE wo_number = ?;",
    data.contactSig, data.signDate1, parseInt(data.wo), callback)
}

module.exports = {
  newOrder, attachFile, getOrders,
  getOrder, getAdmins, addAdmin, removeAdmin, isAdmin, updateStatus,
  draftContract, getContract, signContract
}
