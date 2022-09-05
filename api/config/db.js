const mysql = require("mysql");
const config = require('./config_db')
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

// db.query('SELECT * FROM enigme', function (err, data) {
//   if(err) throw err;
//   console.log('enigme', data)
// });

module.exports = db