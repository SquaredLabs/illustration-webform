var sqlite3 = require("sqlite3").verbose()
var db = new sqlite3.Database("../WorkOrders.db")

function start() {
  db.serialize(function() {
    db.run(
      "\
       CREATE TABLE IF NOT EXISTS wo (wo_number INTEGER PRIMARY KEY AUTOINCREMENT); \
       CREATE TABLE IF NOT EXISTS files (wo_number INTEGER PRIMARY KEY, url varchar(300));\
      "
    )
  })
}

function newOrder(callback) {
  try {
    start()
    db.run("INSERT INTO wo (wo_number) VALUES (NULL);")
    db.get("SELECT MAX(wo_number) FROM wo;", (err, row) =>
      callback(err, row["MAX(wo_number)"])
    )
  } catch (e) {
    console.error(e)
  }
}
function attachFile(filePath, WO, callback) {
  try {
    db.run("INSERT INTO files (wo_number, url) VALUES (?, ?);", WO, filePath, callback)
  } catch (e) {
    console.error(e)
  }
}
function attachFiles(filePaths, WO, callback) {
  // Callback will be run for each file
  filePaths.array.forEach((filePath) => attachFile(filePath, WO, callback));
}
function getFiles(WO, callback) {
  try {
    db.get("SELECT URL FROM FILES WHERE WO_NUMBER=?;", WO, callback)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {newOrder, attachFiles}
