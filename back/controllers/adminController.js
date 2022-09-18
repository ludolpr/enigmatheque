const db = require('../config/db');
// dotenv mis en haut pour l'appel des données sécurisé
const
getAdminPage = async (req, res) => {
  // console.log("getAdminPage");
  const dbEnigmes = await db.query(`SELECT * FROM enigme AS en INNER JOIN membres AS mb ON en.id_user = mb.id`);
  const dbMembres = await db.query(`SELECT * FROM membres`);
  const dbMessage = await db.query(`SELECT * FROM message `);
  // console.log("enigmes OK", dbEnigmes);   
  
  res.render("admin", {
    // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
    layout: "adminLayout",
    dbEnigmes, dbMembres, dbMessage
  });
};
// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
module.exports = { getAdminPage }

