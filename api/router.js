const { Router } = require("express");
const router = Router();
const { getAdminPage } = require("./controllers/adminController");
// const fkdb = require("./json/array.json");
const db = require("./config/db");
const // session user
  { setSession } = require("./utils/setSession"),
  { mailSend } = require("./config/nodeMailer");
// import de flash
const flash = require("flash");
require('dotenv').config()
const { MAIL_USER } = process.env;
const transporter = require("./config/nodeMailer")
// Helpers
// const { cutStr, lign } = require("../helpers");
const bcrypt = require("bcrypt");
const bcrypt_salt = 10;
// Page home
router.get("/", (req, res) => {
  res.render("home");
});

// ----------------------------------------------------------------------- //
// -----------------------------SEPARATE---------------------------------- //
// ----------------------------------------------------------------------- //

// Liste des éngimes + id
router.get("/enigme", async (req, res) => {
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
    // `SELECT * FROM enigme WHERE difficulty=${dif}`
    `SELECT * FROM enigme WHERE difficulty=${dif} AND is_Verified=1`
  );
  console.log(dbEnigmes);
  // const proposEnigme = await db.query (`SELECT * FROM enigme `)
  res.render("enigme", {
    enigmes: dbEnigmes,
    titre: req.query.q,
  });
});

// ----------------------------------------------------------------------- //
// -----------------------------SEPARATE---------------------------------- //
// ----------------------------------------------------------------------- //

// CRUD PROPOSER ÉNIGME
router
  // CREATE IN FORM
  .post("/insertEnigme", async (req, res) => {
    console.log("create::enigme", req.body);
    const { titre, difficulty, content, solus } = req.body;
    // Ajout d'une énigme
    await db.query(
      `INSERT INTO enigme (titre , difficulty, content, solus, id_user) VALUES ("${titre}", "${difficulty}", "${content}", "${solus}", "1");`
    );
    res.render("proposer", { flash: "Votre enigme à été envoyé" });
  })
  // AFFICHER ENIGME
  .get("/enigme/:id", (req, res) => {
    res.render("enigme_details", {});
  })
  // EDIT ENIGME
  .put("/updateEnigme/:id", async (req, res) => {
    console.log("edit::enigme", req.body);
    const { id } = req.params;
    const { titre, difficulty, content, solus } = req.body;

    // if (titre)
    await db.query(
      `UPDATE enigme SET titre="${titre}", difficulty="${difficulty}", content="${content}", solus="${solus}" WHERE id_enigme="${id}";`
    );
    // Redirection vers la page admin
    res.redirect("/admin");
  })
  // DELETE ÉNIGME
  .delete("/deleteEnigme/:id", async (req, res) => {
    console.log("delete::enigme", req.params);
    const { id } = req.params;

    if (id) await db.query(`DELETE FROM enigme WHERE id_enigme = "${id}";`);

    res.redirect("/admin");
  });

// ----------------------------------------------------------------------- //
// -----------------------------SEPARATE---------------------------------- //
// ----------------------------------------------------------------------- //

// CRUD MESSAGE A L'ADMIN
router
  // CREATE IN FORM
  .post("/message", async (req, res) => {
    console.log("message envoyé", req.body);
    const { name, email, sujet, message } = req.body;
    await db.query(
      `INSERT INTO message (name, email, sujet, message ) VALUES ("${name}","${email}", "${sujet}", "${message}");`
    );

    // await db.query(
    //   `INSERT INTO message (name, email, sujet, message ) VALUES ("${name}","${email}", "${sujet}", "${message}" WHERE id=${id};`)

    res.redirect("/");
  })

  .get("/message/:id", (req, res) => {
    res.render("enigme_details", {});
  })
  
  // DELETE MESSAGE
  .delete("/deleteMessage/:id", async (req, res) => {
    console.log("delete::message", req.params);
    const { id } = req.params;

    if (id) await db.query(`DELETE FROM message WHERE id = "${id}";`);

    res.redirect("/admin");
  });

// ----------------------------------------------------------------------- //
// -----------------------------SEPARATE---------------------------------- //
// ----------------------------------------------------------------------- //

// Liste des devinettes + id
router.get("/devinettes", (req, res) => {
  // console.log(req.query);
  res.render("enigme", {
    titre: req.query.q,
  });
});
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// Liste du sage + id
router.get("/lesage", (req, res) => {
  // console.log(req.query);
  res.render("enigme", {
    titre: req.query.q,
  });
});
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// Proposer
router.get("/proposer", (req, res) => {
  res.render("proposer");
});
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// Profile
router.get("/profile", (req, res) => {
  res.render("profile");
});
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// Connexion
router.post("/login", (req, res) => {
  console.log("connecter au site", req.body);
  const { email, password } = req.body;
  db.query(
    `SELECT * FROM membres WHERE email="${email}"`,
    function (err, data) {
      if (err) throw err;

      let user = data[0];
      if (!user) return res.render("home", { flash: "Ce compte n'existe pas" });
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          req.session.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            account_create: user.create_time,
            isAdmin: user.isAdmin,
          };
          res.redirect("/");
        } else return res.render("home", { flash: "Erreur de saisis vériefier vos information" });
      });
    }
  );
});
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// Inscription
router
  .get("/inscription", (req, res) => {
    console.log("inscription", req.body);
    res.render("inscription");
  })
  .post("/inscription", async (req, res) => {
    console.log("inscription OK !", req.body);
    const { name, email, password, confPassword } = req.body;
    // if(password !== confPassword) return res.redirect('/')
    if (name === "" || email === "") {
      res.render("inscription", {
        flash: "Veuillez définir un nom ainsi qu'un email",
      });
    } else if (password === confPassword) {
      await db.query(
        `INSERT INTO membres SET name="${name}", email="${email}", password="${await bcrypt.hash(
          password,
          bcrypt_salt
        )}", isAdmin=0,isVerified=0, isBan=0, avatar="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ms_ni44c-_TBsdHzF0W5awHaHa%26pid%3DApi&f=1"`
      );
      res.redirect("/");
      //return res.redirect("/");
    } else {
      console.log("PB inscription");
      res.render("inscription", {
        flash: "Probleme de confirmation entre vos deux mots de passe",
      });
    }
  });

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("poti-gato");
    console.log("Clear Cookie session :", req);
    res.redirect("/");
  });
});
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// 2nd Layout
router.route("/admin").get(getAdminPage);
console.log("getAdminPage", getAdminPage);

// -----------------------------------------------------------------
// -----------------------------------------------------------------
// nodemailer
router.post("/mail", (req, res) => {
  const { content, sujet, email } = req.body;
  console.log("mail envoyé", req.body);

  transporter.sendMail(
    {
      from: MAIL_USER,
      to: MAIL_USER,
      subject: sujet,
      html: `
          <h1> Le mail du destinataire: ${email}</h1>
          <h3> son message : ${content}</h3>
      `
    },
    function (err, info) {
      if (err) {
        callback(err, info);
      } else {
        callback(null, info);
      }
      transporter.close();
    }
  );

  res.redirect("/");

  // mailSend(
  //   `Email de l'administrateur <${process.env.MAIL_USER}>`,
  //   `Vous <${email}>`,
  //   sujet,
  //   content,
  //   async function (err, info) {
  //   }
  // );
});
// -----------------------------------------------------------------
// -----------------------------------------------------------------
router.post("/mailReply", (req, res) => {
  const { content, sujet, email } = req.body;
  console.log("mail envoyé", req.body);

  transporter.sendMail(
    {
      from: MAIL_USER,
      to: email,
      subject: sujet,
      html: `
          <h1> Le mail du destinataire: ${email}</h1>
          <h3> son message : ${content}</h3>
      `
    },
    function (err, info) {
      if (err) {
        callback(err, info);
      } else {
        callback(null, info);
        // db.query(`DELETE FROM messages WHERE id=${id}`)
      }
      transporter.close();
    }
  );

  res.redirect("/");

  // mailSend(
  //   `Email de l'administrateur <${process.env.MAIL_USER}>`,
  //   `Vous <${email}>`,
  //   sujet,
  //   content,
  //   async function (err, info) {
  //   }
  // );
});





// -----------------------------------------------------------------
// -----------------------------------------------------------------
// exports module
module.exports = router;
