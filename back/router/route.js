require("dotenv").config();

const { Router } = require("express"),
  router = Router();

const db = require("../config/db");
// import de flash
const flash = require("flash");

// mail secure .env

const transporter = require("../utils/nodeMailer");
// bcrypt pour hash le mot de passe
const bcrypt = require("bcrypt");
const bcrypt_salt = 10;
// appel de multer
const upload = require("../utils/multer");

const { MODE } = process.env

// Page home
router.get("/", (req, res) => {
  res.render("home");
});
const
  // IMPORT MIDDLEWARE
  { isAdmin } = require("../middlewares/admin"),
  { isSession } = require("../middlewares/isSession");


// ----------------------------------------------------------------------- //
// --------------------------IMPORT DES CONTROLLER------------------------ //
// ----------------------------------------------------------------------- //

const
  { setSession } = require("../utils/setSession"),
  { mailSend } = require("../utils/nodeMailer"),
  { controllerImage } = require("../controllers/imageControllers"),
  { getAdminPage } = require("../controllers/adminController"),
  { MAIL_USER } = process.env,
  { middlewareImage } = require("../middlewares/middlewareImage"),
  { getEnigmes, putEnigmes, deleteEnigmes, filtreEnigmes, postEnigmes } = require("../controllers/enigmeControllers"),
  { mail, mailReply } = require("../controllers/nodemailer"),
  { message, messageId, deleteMessage } = require("../controllers/messageAdmin"),
  { profilId, profilEdit} = require("../controllers/profil"),
  { login, inscription, logout } = require("../controllers/authController");



// // CONNECT REQUIRED
router.use(isSession)

// ----------------------------------------------------------------------- //
// -------------------------------ENIGME---------------------------------- //
// ----------------------------------------------------------------------- //

// FILTRE ENIGME
router.route("/enigme?q=facile")
  .get(filtreEnigmes)
router.route("/enigme?q=normal")
  .get(filtreEnigmes)
router.route("/enigme?q=difficile")
  .get(filtreEnigmes)
router.route("/enigme?q=devinettes")
  .get(filtreEnigmes)
router.route("/enigme?q=facile")
  .get(filtreEnigmes)

// PROPOSER ÉNIGME
router.route("/insertEnigme")
.get(postEnigmes)

// AFFICHER ENIGME
router.route("/enigme")
  .get(getEnigmes)

// EDIT ENIGME
router.route("/updateEnigme/:id")
  .post(putEnigmes)

// DELETE ÉNIGME
router.route("/deleteEnigme/:id")
  .post(deleteEnigmes)


// ----------------------------------------------------------------------- //
// -------------------------------AUTH------------------------------------ //
// ----------------------------------------------------------------------- //

// LOGIN
router.route("/login")
  .post(login)
// INSCRIPTION
router.route("/inscription")
  .post(inscription)
// LOGOUT
router.route("/logout")
  .post(logout)

// ----------------------------------------------------------------------- //
// -----------------------------PROFIL------------------------------------ //
// ----------------------------------------------------------------------- //

// profile ID
router.route("/profil/:id")
.get(profilId)
// 
router.route("/profilEdit/:id")
.post(profilEdit)
// ----------------------------------------------------------------------- //
// -----------------------------NODEMAILER-------------------------------- //
// ----------------------------------------------------------------------- //

// DIRECT MAIL
router.route("/mail")
  .post(mail)


// ----------------------------------------------------------------------- //
// -------------------------MESSAGE A L'ADMIN----------------------------- //
// ----------------------------------------------------------------------- //

// MESSAGE A L'ADMIN
router.route("/message")
  .post(message)

// GET MESSAGE
router.route("/message/:id")
  .get(messageId)

// DELETE MESSAGE 
router.route("/deleteMessage/:id")
  .post(deleteMessage)

// ADMIN
router.use(isAdmin)

// MESSAGE DATABASE, REPLY BY MAIL
router.route("/mailReply")
  .post(mailReply)



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


// // ----------------------------------------------------------------------- //
// // -----------------------------IMAGE PROFIL------------------------------ //
// // ----------------------------------------------------------------------- //
// router.route("/profilEdit")
// .post(upload.single('image'), controllerImage, middlewareImage)

// ----------------------------------------------------------------------- //
// -----------------------------CONNEXION--------------------------------- //
// ----------------------------------------------------------------------- //



// ----------------------------------------------------------------------- //
// -----------------------------2ND LAYOUT-------------------------------- //
// ----------------------------------------------------------------------- //

router.route("/admin").get(getAdminPage);
console.log("getAdminPage", getAdminPage);





// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
module.exports = router;
