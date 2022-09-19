const mysql = require("mysql");
const configs = require('./dbConfig')
const assert = require("assert");
// mysql instance
db = mysql.createConnection(configs);

db.config.queryFormat = function (query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};

const util = require("util");
db.query = util.promisify(db.query).bind(db);

// connexion db vers mysql
db.connect((err) => {
  if (err) console.error("erreur de connexion: " + err.stack);
  console.log("connecté comme id " + db.threadId);
});

module.exports = db