// ----------------------------------------------------------------------- //
// ----------------------------IMPORT PRINCIPAUX-------------------------- //
// ----------------------------------------------------------------------- //
require("dotenv").config();

const { Router } = require("express"),
  router = Router(),
  db = require("../config/db"),
  // import de flash
  flash = require("flash"),
  // middleware image multer
  upload = require("../utils/multer"),
  // MODE pour test ( Mocha, Chai)
  { MODE } = process.env
// Page home


// ----------------------------------------------------------------------- //
// --------------------------IMPORT DES CONTROLLER------------------------ //
// ----------------------------------------------------------------------- //

const
  { setSession } = require("../utils/setSession"),
  // { mailSend } = require("../utils/nodeMailer"),
  { getPageHome } = require("../controllers/homeControler"),
  { getAdminPage } = require("../controllers/adminController"),
  { middlewareImage } = require("../middlewares/middlewareImage"),
  { getEnigmes, putEnigmes, deleteEnigmes, filtreEnigmes, postEnigmes, getPageProposer, getPageEnigmeId } = require("../controllers/enigmeControllers"),
  { mail, mailReply } = require("../controllers/nodeMailer"),
  { message, messageId, deleteMessage } = require("../controllers/messageAdmin"),
  { profilId, profilEdit } = require("../controllers/profil"),
  { login, inscription, logout, getPageInscription } = require("../controllers/authController");
// ----------------------------------------------------------------------- //
// ----------------------------------------------------------------------- //

const
  // IMPORT MIDDLEWARE
  { isAdmin } = require("../middlewares/admin"),
  { isSession } = require("../middlewares/isSession");


router.route("/").get(getPageHome)


// ----------------------------------------------------------------------- //
// -------------------------------AUTH------------------------------------ //
// ----------------------------------------------------------------------- //

// LOGIN
router.route("/login").post(login)
// INSCRIPTION$
router.route("/inscription").post(inscription).get(getPageInscription)

// ----------------------------------------------------------------------- //
// -----------------------------NODEMAILER-------------------------------- //
// ----------------------------------------------------------------------- //

// DIRECT MAIL ( NO CONNECTED )
router.route("/").post(mail)


// // CONNECT REQUIRED
router.use(isSession)
// LOGOUT
router.route("/logout").post(logout)

// ----------------------------------------------------------------------- //
// -------------------------------ENIGME---------------------------------- //
// ----------------------------------------------------------------------- //

// AFFICHER ENIGME
router.route("/enigme").get(filtreEnigmes)
router.route("/enigme/{{this.id_enigme}}").get(getPageEnigmeId)
// PROPOSER ÉNIGME
router.route("/proposer").get(getPageProposer)
router.route("/insertEnigme").post(postEnigmes)

// EDIT ENIGME
router.route("/updateEnigme/:id").put(putEnigmes)

// DELETE ÉNIGME
router.route("/deleteEnigme/:id").post(deleteEnigmes)

// ----------------------------------------------------------------------- //
// -----------------------------PROFIL------------------------------------ //
// ----------------------------------------------------------------------- //

// profile ID
router.route("/profil/:id").get(profilId)
// EDIT PROFILE ID
router.route("/profilEdit/:id").put(upload.single("avatar"), profilEdit)


// ----------------------------------------------------------------------- //
// -------------------------MESSAGE A L'ADMIN----------------------------- //
// ----------------------------------------------------------------------- //

// MESSAGE A L'ADMIN
router.route("/message").post(message)

// GET MESSAGE
router.route("/message/:id").get(messageId)

// DELETE MESSAGE 
router.route("/deleteMessage/:id").delete(deleteMessage)

// ADMIN PANEL
router.route("/admin").get(getAdminPage)

// MESSAGES DATABASE, REPLY BY MAIL
router.route("/mailReply").post(mailReply)

// ADMIN
router.use(isAdmin)
// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
module.exports = router;
