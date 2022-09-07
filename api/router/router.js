const { Router } = require("express");
const router = Router();
const { getAdminPage } = require("../controllers/adminController");
// const fkdb = require("./json/array.json");
const db = require("../config/db");
const // session user
  { setSession } = require("../utils/setSession"),
  { mailSend } = require("../config/nodeMailer");
// import de flash
const flash = require("flash");
require("dotenv").config();
// mail secure .env
const { MAIL_USER } = process.env;
const { middlewareImage } = require("../middlewares/middlewareImage");
const { controllerImage } = require("../controllers/imageControllers");
const { getEnigmes } = require("../controllers/enigmeControllers");
const transporter = require("../config/nodeMailer");
// bcrypt pour hash le mot de passe
const bcrypt = require("bcrypt");
const bcrypt_salt = 10;
// appel de multer
const upload = require("../utils/multer");
// Page home
router.get("/", (req, res) => {
  res.render("home");
});
// ----------------------------------------------------------------------- //
// ----------------------------TEST UNITAIRES----------------------------- //
// ----------------------------------------------------------------------- //
router.route("/enigme")
      .get(getEnigmes);

// ----------------------------------------------------------------------- //
// -------------------LISTE DES ENIGMES + ID------------------------------ //
// ----------------------------------------------------------------------- //
// il permet de voir les enigmes dans leurs categories
// ----------------------------------------------------------------------- //

// // Liste des éngimes + id
// router.get("/enigme", async (req, res) => {
//   console.log("enigmes", req.query);
//   let dif;
//   switch (req.query.q) {
//     case "facile":
//       dif = 1;
//       break;
//     case "normal":
//       dif = 2;
//       break;
//     case "difficile":
//       dif = 3;
//       break;
//     case "devinettes":
//       dif = 4;
//       break;
//     case "sage":
//       dif = 5;
//       break;
//     default:
//       dif = 1;
//   }
//   console.log("difficulty lvl", dif);
//   const dbEnigmes = await db.query(
//     // `SELECT * FROM enigme WHERE difficulty=${dif}`
//     `SELECT * FROM enigme WHERE difficulty=${dif} AND is_Verified=1`
//   );
//   console.log(dbEnigmes);
//   // const proposEnigme = await db.query (`SELECT * FROM enigme `)
//   res.render("enigme", {
//     enigmes: dbEnigmes,
//     titre: req.query.q,
//   });
// });

// ----------------------------------------------------------------------- //
// -----------------------CRUD PROPOSER ÉNIGME---------------------------- //
// ----------------------------------------------------------------------- //

// CRUD PROPOSER ÉNIGME
router
  // CREATE IN FORM
  .post("/insertEnigme", async (req, res) => {
    console.log("create::enigme", req.body);
    const { titre, difficulty, content, solus } = req.body;
    // Ajout d'une énigme
    await db.query(
      `INSERT INTO enigme (titre , difficulty, content, solus, id_user) VALUES ("${titre}", "${difficulty}", "${content}", "${solus}", "1" AND is_Verified=0);`
    );

    if (process.env.MODE === "test")
      res.json({ flash: "Votre enigme à été envoyé", dbEnigmes });
    else res.render("proposer", { flash: "Votre enigme à été envoyé" });
  })
  // AFFICHER ENIGME
  .get("/enigme/:id", async (req, res) => {
    const { id } = req.params;
    const enigme = await db.query(
      `select * from enigme WHERE id_enigme = ${id}`
    );
    if (enigme.lenght <= 0) res.redirect("/");
    else
      res.render("enigme_details", {
        enigme: enigme[0],
      });
  })
  // EDIT ENIGME
  .put("/updateEnigme/:id", async (req, res) => {
    console.log("edit::enigme", req.body);
    const { id } = req.params;
    const { titre, difficulty, content, solus, is_Verified } = req.body;

    // if (titre)
    await db.query(
      `UPDATE enigme SET titre="${titre}", difficulty="${difficulty}", content="${content}", solus="${solus}", is_Verified="${
        is_Verified === "on" ? 1 : 0
      }" WHERE id_enigme="${id}";`
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
// ---------------------CRUD MESSAGE A L'ADMIN---------------------------- //
// ----------------------------------------------------------------------- //

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
// -----------------------------DEVINETTES-------------------------------- //
// ----------------------------------------------------------------------- //

// Liste des devinettes + id
router.get("/devinettes", (req, res) => {
  // console.log(req.query);
  res.render("enigme", {
    titre: req.query.q,
  });
});
// ----------------------------------------------------------------------- //
// ------------------------LISTE DU SAGE + ID----------------------------- //
// ----------------------------------------------------------------------- //
// Liste du sage + id
router.get("/lesage", (req, res) => {
  // console.log(req.query);
  res.render("enigme", {
    titre: req.query.q,
  });
});
// ----------------------------------------------------------------------- //
// -----------------------------PROPOSER------------------------------- //
// ----------------------------------------------------------------------- //

router.get("/proposer", (req, res) => {
  res.render("proposer");
});
// ----------------------------------------------------------------------- //
// -----------------------------PROFIL------------------------------------ //
// ----------------------------------------------------------------------- //
router
  .get("/profil/:id", async (req, res) => {
    const { id } = req.params;
    const profil = await db.query(`select * from membres WHERE id = ${id}`);
    if (profil.lenght <= 0) res.redirect("/");
    else
      res.render("profil", {
        profil: profil[0],
      });
  })
  .put("/profilEdit/:id", upload.single("avatar"), async (req, res) => {
    console.log("edit::profil", req.body);
    const { id } = req.params;
    const { name, email, password, confPassword, bio } = req.body;

    if (name) {
      await db.query(`UPDATE membres SET name="${name}" WHERE id=${id}`);
    }
    if (email) {
      await db.query(`UPDATE membres SET email="${email}" WHERE id=${id}`);
    }
    if (password.lenght > 0 && password === confPassword) {
      bcrypt.hash(
        password,
        confPassword,
        bcrypt_salt,
        async function (err, hash) {
          await db.query(
            `UPDATE membres SET password="${hash}" WHERE id=${id}`
          );
        }
      );
    }
    if (bio) {
      await db.query(`UPDATE membres SET bio="${bio}" WHERE id=${id}`);
    }

    let userget = await db.query(
      `SELECT * FROM membres WHERE id="${req.session.user.id}" `
    );
    let user = userget[0];

    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      account_create: user.create_time,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      bio: user.bio,
    };

    res.redirect("back");
  });

// // ----------------------------------------------------------------------- //
// // -----------------------------IMAGE PROFIL------------------------------ //
// // ----------------------------------------------------------------------- //
// router.route("/profilEdit")
// .post(upload.single('image'), controllerImage, middlewareImage)

// ----------------------------------------------------------------------- //
// -----------------------------CONNEXION--------------------------------- //
// ----------------------------------------------------------------------- //

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
            avatar: user.avatar,
            bio: user.bio,
          };
          res.redirect("/");
        } else return res.render("home", { flash: "Erreur de saisis vérifier vos information" });
      });
    }
  );
});
// ----------------------------------------------------------------------- //
// -----------------------------INSCRIPTION------------------------------- //
// ----------------------------------------------------------------------- //
router
  .get("/inscription", (req, res) => {
    console.log("inscription", req.body);
    res.render("inscription");
  })
  .post("/inscription", async (req, res) => {
    console.log("inscription OK !", req.body);
    const { name, email, password, confPassword } = req.body;
    const checkEmail = await db.query(`SELECT email FROM membres`);
    const checkName = await db.query(`SELECT name FROM membres`);
    // if(password !== confPassword) return res.redirect('/')
    if (name === "" || email === "") {
      res.render("inscription", {
        flash: "Veuillez définir un nom ainsi qu'un email",
      });
    } else if (email === checkEmail || name === checkName) {
      console.log("mail ou name déjà utilisé");
      res.render("back");
    } else if (password === confPassword) {
      await db.query(
        `INSERT INTO membres SET name="${name}", email="${email}", password="${await bcrypt.hash(
          password,
          bcrypt_salt
        )}", isAdmin=0,isVerified=0, isBan=0, avatar="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ms_ni44c-_TBsdHzF0W5awHaHa%26pid%3DApi&f=1"`
      );
      res.render("home", { flashInscrit: "Vous êtes maintenant inscrit" });
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

// ----------------------------------------------------------------------- //
// -----------------------------2ND LAYOUT-------------------------------- //
// ----------------------------------------------------------------------- //

router.route("/admin").get(getAdminPage);
console.log("getAdminPage", getAdminPage);

// ----------------------------------------------------------------------- //
// -----------------------------NODEMAILER-------------------------------- //
// ----------------------------------------------------------------------- //

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
      `,
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
// ----------------------------------------------------------------------- //
// ------------------------NODEMAILER REPLY------------------------------- //
// ----------------------------------------------------------------------- //
router.post("/mailReply", (req, res) => {
  const { content, sujet, email } = req.body;
  console.log("mail envoyé", req.body);

  transporter.sendMail(
    {
      from: MAIL_USER,
      to: email,
      subject: `Enigmatheque + ${sujet}`,
      html: `
          <h2> Réponse de l'administrateur : ${content}</h2>
      `,
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

// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
module.exports = router;
