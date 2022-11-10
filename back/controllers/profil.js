// IMPORT DES MODULES 
const bcrypt = require('bcrypt');
const bcrypt_salt = 10;
const path = require("path");
const fs = require("fs");
const
  // ----------------------------------------------------------------------- //
  // -----------------------------PROFIL------------------------------------ //
  // ----------------------------------------------------------------------- //
  profilId = async (req, res) => {
    const { id } = req.params;
    // console.log("IDDD",id);
    const profil = await db.query(`select * from membres WHERE id="${id}"`);
    if (profil.lenght <= 0) res.redirect("/");
    else
      res.render("profil", {
        profil: profil[0],
      });
  },
  profilEdit = async (req, res) => {
    const image = req.file ? req.file.filename : false;
    // console.log("edit::profil", req.body);
    const { id } = req.params;
    const { name, email, password, confPassword, bio } = req.body;
    const [ava] = await db.query(`SELECT avatar FROM membres WHERE id=${id}`)
    
    if (image) {
      if (ava.avatar !== "default.png") {
        pathImg = path.resolve("public/images/" + ava.avatar)
        fs.unlink(pathImg, (err) => {
          if (err) throw err;
        })
      }
      await db.query(`UPDATE membres SET avatar="${image}" WHERE id=${id}`);
    }
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
  };
// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
module.exports = { profilId, profilEdit }