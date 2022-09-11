require("dotenv").config();

// ----------------------------------------------------------------------- //
// -------------------LISTE DES ENIGMES + ID------------------------------ //
// ----------------------------------------------------------------------- //
// il permet de voir les enigmes dans leurs categories
// ----------------------------------------------------------------------- //
const
  // FILTRE DES ENIGMES
  filtreEnigmes = async  (req, res) => {
    console.log("getEnigmes");

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
      case "sage":
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
      res.json({ enigmes: dbEnigmes, titre: req.query.q });
    } else {
      res.render("enigme", {
        enigmes: dbEnigmes,
        titre: req.query.q,
      });
    }
  },

  postEnigmes =  async (req, res) => {
    console.log("create::enigme");
    const { titre, difficulty, content, solus } = req.body;
    // Ajout d'une énigme
    const insertEnigme = await db.query(
      `INSERT INTO enigme (titre , difficulty, content, solus, id_user) VALUES ("${titre}", "${difficulty}", "${content}", "${solus}", 1);`
    );
    const [newEnigme] = await db.query(`SELECT * FROM enigme WHERE id_enigme = ${insertEnigme.insertId}`)
    console.log('memotechnik', insertEnigme, newEnigme)

    if (MODE === "test")
      res.json({
        newEnigme,
        flash: "Votre enigme à été envoyé",
        dbEnigmes: await db.query('SELECT * FROM enigme')
      });
    else res.render("proposer", { flash: "Votre enigme à été envoyé" });
  },

  // AFFICHER ENIGME
  getEnigmes = async (req, res) => {
    const { id } = req.params;
    const [enigme] = await db.query(
      `select * from enigme WHERE id_enigme = "${id}";`
    );
    if (!enigme) return res.redirect("/");

    if (MODE === "test") res.json({
      enigme
    })
    else res.render("enigme_details", {
      enigme
    })
  },

  // EDIT ENIGME
  putEnigmes = async (req, res) => {
    console.log("edit::enigme", req.body);
    const { id } = req.params;
    console.log(req.params);
    const { titre, difficulty, content, solus, is_Verified } = req.body;

    // if (titre)
    const updateEnigme = await db.query(
      `UPDATE enigme SET titre="${titre}", difficulty="${difficulty}", content="${content}", solus="${solus}", is_Verified="${is_Verified === "on" ? 1 : 0
      }" WHERE id_enigme="${id}";`
    );
    console.log(putEnigme);
    const [putEnigme] = await db.query(`UPDATE enigme SET titre="${titre}", difficulty="${difficulty}", content="${content}", solus="${solus}", is_Verified="${is_Verified === "on" ? 1 : 0
      }" WHERE id_enigme="${updateEnigme.insertId}";`)

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
  deleteEnigmes =  async (req, res) => {
    console.log("delete::enigme", req.params);
    const { id } = req.params;

    if (id) await db.query(`DELETE FROM enigme WHERE id_enigme = "${id}";`);

    res.redirect("/admin");
  };




module.exports = { filtreEnigmes, getEnigmes, putEnigmes, deleteEnigmes, postEnigmes }