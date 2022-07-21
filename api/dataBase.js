const mysql = require ("mysql");

// connexion a la base de données
db = mysql.createConnection({
    host: "localhost",
    user: "ludolpr",
    password: "lud90Eni-",
    database : "dataenigme"
});

// module
module.exports = db;
// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connecté à la base de données MySQL!");
//   });

  // db.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connecté à la base de données MySQL!");
  //  db.query("CREATE DATABASE mabdd", function (err, result) {
  //       if (err) throw err;
  //       console.log("Base de données créée !");
  //     });
  // });