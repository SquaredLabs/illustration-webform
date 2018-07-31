var sqlite3 = require("sqlite3").verbose()
var db = new sqlite3.Database("../WorkOrders.db")

function start() {
  db.serialize(function() {
    db.run(
      "CREATE TABLE IF NOT EXISTS wo (wo_number INTEGER PRIMARY KEY AUTOINCREMENT);"
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

module.exports = newOrder
