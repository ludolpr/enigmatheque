const db = require('../config/db')


exports.getAdminPage = async (req, res) => {
  console.log("getAdminPage");
  const dbEnigmes = await db.query(`SELECT * FROM enigme`);
  const dbMembres = await db.query(`SELECT * FROM membres`);
  
  res.render("admin", {
    // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
    layout: "adminLayout",
    dbEnigmes, dbMembres
  });
};


  // .get("/admin", async (req, res) => {
  //   // ajout d'un article
  //   /*
  // // Redirection vers la page Admin
  //   if ( isAdmin() === true ) {
  //     // page admin
  //     res.redirect("/admin")
  // } else {
  //     // page proposer
  //     res.redirect("/proposer")
  //     console.log("hey",isAdmin);
  // }
  // */

  // console.log('admin page', dbEnigmes)
  //   res.render("admin", {
  //     dbEnigmes
  //   });
  // });