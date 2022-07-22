
// Import modules
const mysql = require("mysql");

// mysql instance
db = mysql.createConnection(require('./config').config);

// connexion db vers mysql
db.connect((err) => {
  if (err) console.error("erreur de connexion: " + err.stack);
  console.log("connecté comme id " + db.threadId);
});



//export de la db
exports.db = db;