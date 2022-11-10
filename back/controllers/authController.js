require("dotenv").config();
const bcrypt = require('bcrypt');
const bcrypt_salt = 10;
const transporter = require("../utils/nodeMailer")
const jwt = require('jsonwebtoken');


const
    // ----------------------------------------------------------------------- //
    // -----------------------------CONNEXION--------------------------------- //
    // ----------------------------------------------------------------------- //
    login = async (req, res) => {
        const { email, password } = req.body;
        console.log("login !! ", req.body);
        db.query(
            `SELECT * FROM membres WHERE email="${email}"`,
            function (err, data) {
                // console.log("1", data);
                if (err) throw err;

                let user = data[0];
                if (!user)
                    if (process.env.MODE === "test") {
                        return res.json({ flashConnexion: "Votre compte n'est pas correct" });

                    } else {
                        return res.render("home", { flashConnexion: "Ce compte n'existe pas" });
                    }


                // console.log("2", user, password);
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err || !result) {
                        if (process.env.MODE === "test") {
                            res.json({ flash: "Erreur de saisis vérifier vos information" });
                        } else {
                            res.render("home", { flash: "Erreur de saisis vérifier vos information" })
                        }
                    }

                    if (result) {
                        req.session.user = {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            account_create: user.create_time,
                            isAdmin: user.isAdmin,
                            avatar: user.avatar,
                            bio: user.bio,
                        };

                        if (process.env.MODE === "test") {
                            // console.log("3");
                            return res.json({ flash: "Connexion reussi" });

                        } else {
                            console.log("4");
                            return res.redirect("/");


                        }

                    }
                });
            }
        );
    },
    // ----------------------------------------------------------------------- //
    // -----------------------------INSCRIPTION------------------------------- //
    // ----------------------------------------------------------------------- //
    getPageInscription = async (req, res) => {
        res.render("inscription")
    },
    inscription = async (req, res) => {
        console.log("inscription OK !", req.body);
        const { name, email, password, confPassword } = req.body;
        const checkEmail = await db.query(`SELECT email FROM membres`);
        const checkName = await db.query(`SELECT name FROM membres`);
        if (password !== confPassword) return res.redirect('/')
        if (name === "" || email === "") {
            res.render("inscription", {
                flash: "Veuillez définir un nom ainsi qu'un email",
            });
        } else if (email === checkEmail || name === checkName) {
            console.log("mail ou name déjà utilisé");
            res.render("back");
        } else if (password === confPassword) {
            const newUser =  await db.query(
                `INSERT INTO membres SET name="${name}", email="${email}", password="${await bcrypt.hash(
                    password,
                    bcrypt_salt
                )}", isAdmin=0,isVerified=0, isBan=0, avatar="default.png"`
            );
            const [membres] = await db.query(`SELECT * FROM membres WHERE id = ${newUser.insertId}`)
            console.log([membres]);
            const token = jwt.sign({ membres }, "SecretKey");
       
            // req.session.membres = membres
            req.session.token = token
       
            try {

                const data = await transporter.sendMail({
                    from:'"Enigmatheque" MAIL_USER' ,
                    to: email,
                    subject: `Confirmation du compte sur le site Enigmatheque.fr`,
                    html: `
                      <h2> Bonjour, </h2>
                      <h5>Pour activer votre compte utilisateur, veuillez cliquer sur le lien ci-dessous </h5>
                      <br>
                      <a href="${process.env.DOMAIN}/verification/${token}" style="display:inline-block;background-color:#000000;color:white;font-family:Helvetica Neue,sans-serif;font-size:16px;font-weight:700;line-height:120%;text-decoration:none;text-transform:none;border-radius:100px;box-sizing:border-box;margin:0;padding:10px 32px" rel="noreferrer" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://clicks.sorare.com/f/a/1ZPsQjLVf4lJx2fw2sZs4Q~~/AAAHagA~/RgRlC89QP0QhaHR0cHM6Ly9zb3JhcmUuY29tL2xvYmJ5L3VwY29taW5nVwVzcGNldUIKYyNQSiljS19Y7lIVZW9ndWFyZGlhbnNAZ21haWwuY29tWAQAAAFC&amp;source=gmail&amp;ust=1663915558713000&amp;usg=AOvVaw3HlTEOfUlHVkQ94gx8Xa54"> Cliquez-ici </a>

                      
                  `
                })

                console.log("Email de confirmation de compte est bien envoyé !!", data)
                console.log("1er token", token);
                // res.redirect('/');
            } catch (error) {
                console.log("error", error)
                res.redirect('/')
            }
            res.render("home", { flash: "Vous êtes maintenant inscrit" });
            //return res.redirect("/");

        } else {
            console.log("PB inscription");
            res.render("inscription", {
                flash: "Probleme de confirmation entre vos deux mots de passe",
            });
        }
    },
    getPageVerification = (req, res) => {
        console.log("info req.session", req.session);
        const { token }  = req.session
        console.log("voici le token", token);

        jwt.verify(token, "SecretKey", async (err, decoded) => {
            console.log("decoded", decoded);
            if (err) {
                console.log(err);
                // ne passe pa splus loin ???
                res.send('Email de verification echoué, le lien est invalide');
            }
            else {
                const [membres] = await db.query(`SELECT * FROM membres WHERE id="${decoded.membres.id}"`)

                if (!membres) {
                    console.log("pb membres");
                    res.redirect("/")
                } else {
                    console.log('Email de verification success');
                    db.query(`UPDATE membres SET isVerified="1" WHERE id="${decoded.membres.id}"`)
                    res.redirect("/");
                }
            }
        });
    },

    // ----------------------------------------------------------------------- //
    // -----------------------------LOGOUT------------------------------------ //
    // ----------------------------------------------------------------------- //
    logout = async (req, res) => {
        req.session.destroy(() => {
            res.clearCookie('poti-gato');
            console.log("Clear Cookie session :", req.sessionID);
            res.redirect('/');
        })
    };
// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //u
module.exports = { login, inscription, logout, getPageInscription, getPageVerification }