const mysql = require("mysql");
const config = require('./dbConfig')
const assert = require("assert");
// mysql instance
db = mysql.createConnection(config);

const util = require("util");
db.query = util.promisify(db.query).bind(db);

// connexion db vers mysql
db.connect((err) => {
  if (err) console.error("erreur de connexion: " + err.stack);
  console.log("connecté comme id " + db.threadId);
});

module.exports = db