const { Router } = require("express");
const router = Router();
const { getAdminPage } = require("./controllers/adminController");
// const fkdb = require("./json/array.json");
const db = require("./config/db");
// session user 
const { setSession } = require("../api/utils/setSession");
// const utils = require("./utils/setSession")
// helpers
// const { cutStr, lign } = require("../helpers");
// const { setServers } = require("dns");
const bcrypt = require('bcrypt');
const  bcrypt_salt = 10;
// page home
router.get("/", (req, res) => {
  res.render("home");
});

// liste des éngimes + id
router
  .get("/enigme", async (req, res) => {
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
    console.log("difficulty lvl", dif);
    const dbEnigmes = await db.query(
      `SELECT * FROM enigme WHERE difficulty=${dif} AND isVerified=1`
    );
    console.log(dbEnigmes);
    // const proposEnigme = await db.query (`SELECT * FROM enigme `)
    res.render("enigme", {
      enigmes: dbEnigmes,
      titre: req.query.q,
    });
  })



  // CRUD PROPOSER ENIGME
  // CREATE
  .post("/enigme", async (req, res) => {
    console.log("create::enigme", req.body);
    const { titre, difficulty, content, solus } = req.body;

    await db.query(
      `INSERT INTO enigme (titre , difficulty, content, solus, id_user) VALUES ("${titre}", "${difficulty}", "${content}", "${solus}", "1");`
    );
    res.redirect("/proposer");
  });


router
  .get("/enigme/:id", (req, res) => {
    res.render("enigme_details", {});
  })
  // EDIT
  .put("/enigme/:id", async (req, res) => {
    console.log("edit::enigme", req.body);
    const { id } = req.params;
    const { titre, difficulty, content, solus } = req.body;

    if (titre)
      await db.query(
        `UPDATE enigme SET titre = "${titre}" WHERE id_enigme = ${id};`
      );
    if (difficulty)
      await db.query(
        `UPDATE enigme SET difficulty = "${difficulty}" WHERE id_enigme = ${id};`
      );
    if (content)
      await db.query(
        `UPDATE enigme SET content = "${content}" WHERE id_enigme = ${id};`
      );
    if (solus)
      await db.query(
        `UPDATE enigme SET solus = "${solus}" WHERE id_enigme = ${id};`
      );

    res.redirect("/admin");
  })
  // DELETE
  .delete("/enigme/:id", async (req, res) => {
    console.log("delete::enigme", req.params);
    const { id } = req.params;

    if (id) await db.query(`DELETE FROM enigme WHERE id_enigme = "${id}";`);

    res.redirect("/admin");
  });

// message à l'admin

router.post("/message", async (req, res) => {
  console.log("message envoyé", req.body);
  const { name, email, sujet, message } = req.body;

  await db.query(
    `INSERT INTO message (name, email, sujet, message ) VALUES ("${name}","${email}", "${sujet}", "${message}");`
  );

  res.redirect("/");
});

router.delete("/message/:id", async (req, res) => {
  console.log("delete::message", req.params);
  const { id } = req.params;

  if (id) await db.query(`DELETE FROM message WHERE id = "${id}";`);

  res.redirect("/admin");
});
// .get("/message/:id", (req, res) => {
//   res.render("/message", {});
// })

// EDIT
// DELETE
// DELETE

// CREATE
// EDIT
// DELETE

//liste des devinettes + id
router.get("/devinettes", (req, res) => {
  // console.log(req.query);
  res.render("enigme", {
    titre: req.query.q,
  });
});

// liste du sage + id
router.get("/lesage", (req, res) => {
  // console.log(req.query);
  res.render("enigme", {
    titre: req.query.q,
  });
});

// proposer
router.get("/proposer", (req, res) => {
  res.render("proposer");
});

// profile
router.get("/profile", (req, res) => {
  res.render("profile");
});

// inscription
router
  .get("/inscription", (req, res) => {
    res.render("inscription");
  })
  .post("/inscription", async (req, res) => {
    console.log("inscription", req.body);
    const { name, email, password } = req.body;

    await db.query(
      `INSERT INTO membres (name, email, password) VALUES ("${name}", "${email}", "${password}");`
    );

    res.redirect("/");
  });

// connexion
  router
  .post("/login"), (req, res) => {
    const { email, password } = req.body
    db.query(`SELECT password FROM membres WHERE email="${email}"`, function(err, data){
     if(err) throw err;
     
     if(!data[0]) return res.render("/", { flash: "Ce compte n'existe pas"})
     bcrypt.compare(password, data[0].password, function (err, result){
      if (result === true) { setSession(req, res, email) } else return res.render("connexion" , { flash: "L\'email ou le mot de passe n\'est pas correct !"})
     });
    })
  }

  router
  .post('/logout', (req, res)=>{
    req.session.destroy(() => {
      res.clearCookie('poti-gato');
      console.log("Clear Cookie session :", req.sessionID);
      res.redirect('/');
    })
  })  
// 2nd Layout
router.route("/admin").get(getAdminPage);
console.log("getAdminPage", getAdminPage);

module.exports = router;
