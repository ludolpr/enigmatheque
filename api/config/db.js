const mysql = require("mysql");

require('dotenv').config()

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

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

module.exports = {
 db, config 
};
