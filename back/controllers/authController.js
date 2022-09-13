const bcrypt = require('bcrypt');
const bcrypt_salt = 10;

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

                if (err) throw err;

                let user = data[0];
                if (!user) {

                    if (process.env.MODE === "test") {
                        res.json({ flash: "Ce compte n'existe pas" });
                    } else {
                        res.render("home", { flash: "Ce compte n'existe pas" });
                    }
                }
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
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
                            res.json({ flash: "Connexion success" });
                        } else {
                            res.redirect("/");
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
module.exports = { login, inscription, logout, getPageInscription }