// IMPORTS DES MODULES
require("dotenv").config();
const flash = require("flash")

const { MODE } = process.env


// ----------------------------------------------------------------------- //
// -------------------LISTE DES ENIGMES + ID------------------------------ //
// ----------------------------------------------------------------------- //
// il permet de voir les enigmes dans leurs categories
// ----------------------------------------------------------------------- //
const

  getPageProposer = async (req, res) => {
    res.render("proposer")
  },
  // FILTRE DES ENIGMES
  filtreEnigmes = async (req, res) => {
    // console.log("iiiiiii", req.query);
    let dif;
    switch (req.query.q) {
      case "facile":
        dif = 1;
        break;
      case "normal":
        dif = 2;
        break;
      case "difficile":
        dif = 3;
        break;
      case "devinettes":
        dif = 4;
        break;
      case "homme-sage":
        dif = 5;
        break;
      default:
        dif = 1;
    }
    //   console.log("difficulty lvl", dif);
    const
      dbEnigmes = await db.query(
        `SELECT * FROM enigme WHERE difficulty=${dif} AND is_Verified=1`
      );
    //   console.log(dbEnigmes);

    if (process.env.MODE === "test") {
      console.log("salut !!!", dbEnigmes);
      res.json({ enigmes: dbEnigmes, titre: req.query.q });
    } else {
      res.render("enigme", {
        enigmes: dbEnigmes,
        titre: req.query.q,
      });
    }
  },

  postEnigme = async (req, res) => {
        // console.log("iiiiiii", req.query);
    console.log("create::enigme", req.body);
    const { titre, difficulty, content, solus } = req.body;
    // Ajout d'une énigme
    console.log(req.session);
    // const insertEnigme = await db.query(
    //   `INSERT INTO enigme (titre , difficulty, content, solus, id_user) VALUES ("${titre}", "${difficulty}", "${content}", "${solus}", "${req.session.user.id}");`,
    // );
    //
    const insertEnigme = await db.query(`INSERT INTO enigme SET titre=:titre, difficulty=:difficulty, content=:content, solus=:solus, id_user="${req.session.user.id}"`, {titre, difficulty, content, solus});
   
    const [newEnigme] = await db.query(`SELECT * FROM enigme WHERE id_enigme = ${insertEnigme.insertId}`)
    console.log('memotechnik', insertEnigme, newEnigme)
    // console.log("mode", MODE);
    if (MODE === "test")
      res.json({
        newEnigme,
        flash: "Votre enigme à été envoyé",
        dbEnigmes: await db.query('SELECT * FROM enigme')
      });
    else
      res.render("proposer", { flash: "Votre enigme à été envoyé" });
  },

  // AFFICHER ENIGME
  getEnigmeId = async (req, res) => {
    // console.log('getEnigmesId', req.params.id)
    const { id } = req.params;
    const [enigme] = await db.query(
      `select * from enigme WHERE id_enigme = "${id}";`
    );


    if (!enigme) {
      console.log("1");
      if (MODE === "test") res.json({
        flash: "Enigme introuvable"
      })
      else res.redirect("/");
    }
    else if (MODE === "test") res.json({
      enigme
    })
    else res.render("enigme_details", {
      enigme
    })
  },

  // EDIT ENIGME
  putEnigme = async (req, res) => {
    // console.log("edit::enigme", req.body);
    const { id } = req.params;
    // console.log(req.params);
    const { titre, difficulty, content, solus, is_Verified } = req.body;

    // if (titre)
    const putEnigme = await db.query(
      `UPDATE enigme SET titre="${titre}", difficulty="${difficulty}", content="${content}", solus="${solus}", is_Verified="${is_Verified === "on" ? 1 : 0
      }" WHERE id_enigme="${id}";`
    );

    // Redirection vers la page admin
    if (MODE === "test")
      res.json({
        putEnigme,
        flash: "Votre enigme à été modifié",
        dbEnigmes: await db.query('SELECT * FROM enigme')
      });
    else res.redirect("/admin");
  },
  // DELETE ÉNIGME
  deleteEnigme = async (req, res) => {
    const { id } = req.params;
    console.log("delete::enigme", id);

    if (id) {
      await db.query(`DELETE FROM enigme WHERE id_enigme = "${id}";`);
  }
  if (MODE === "test")
      res.json({
        flash: "Votre enigme à été supprimer"
      });
    else res.redirect("/admin");
  };



// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
module.exports = { filtreEnigmes, getEnigmeId, putEnigme, deleteEnigme, postEnigme, getPageProposer }