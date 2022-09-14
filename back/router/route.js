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
  upload = require("../utils/multer")

// ----------------------------------------------------------------------- //
// --------------------------IMPORT DES CONTROLLER------------------------ //
// ----------------------------------------------------------------------- //

const
  { setSession } = require("../utils/setSession"),
  { getPageHome } = require("../controllers/homeControler"),
  { getAdminPage } = require("../controllers/adminController"),
  { MAIL_USER } = process.env,
  { middlewareImage } = require("../middlewares/middlewareImage"),
  { getEnigmeId, putEnigme, deleteEnigme, filtreEnigmes, postEnigme, getPageProposer } = require("../controllers/enigmeControllers"),
  { mail, mailReply } = require("../controllers/nodeMailer"),
  { message, messageId, deleteMessage } = require("../controllers/messageAdmin"),
  { page404 } = require("../controllers/page404"),
  { profilId, profilEdit } = require("../controllers/profil"),
  { login, inscription, logout, getPageInscription } = require("../controllers/authController");
// ----------------------------------------------------------------------- //
// ----------------------------------------------------------------------- //

const
  // IMPORT MIDDLEWARE
  { isAdmin } = require("../middlewares/admin"),
  { isSession } = require("../middlewares/isSession");

// home
router.route("/").get(getPageHome)
// page 404
// router.route("/*").get(page404)
// ----------------------------------------------------------------------- //
// -------------------------------AUTH------------------------------------ //
// ----------------------------------------------------------------------- //

// LOGIN
router.route("/login").post(login)
// INSCRIPTION$
router.route("/inscription").post(inscription).get(getPageInscription)

// ----------------------------------------------------------------------- //
// -----------------------------NODEMAILER-------------------------------- //
router.use(isSession)
// ----------------------------------------------------------------------- //

// DIRECT MAIL ( NO CONNECTED )
router.route("/mail").post(mail)


// // CONNECT REQUIRED
// LOGOUT
router.route("/logout").post(logout)

// ----------------------------------------------------------------------- //
// -------------------------------ENIGME---------------------------------- //
// ----------------------------------------------------------------------- //

// AFFICHER ENIGME
router.route("/enigme/:id").get(getEnigmeId)
router.route("/enigme").get(filtreEnigmes)
// PROPOSER ÉNIGME
router.route("/proposer").get(getPageProposer)
router.route("/insertEnigme").post(postEnigme)

// EDIT ENIGME
router.route("/updateEnigme/:id").put(putEnigme)

// DELETE ÉNIGME
router.route("/deleteEnigme/:id").post(deleteEnigme)

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

router.use(isAdmin)

// GET MESSAGE
router.route("/message/:id").get(messageId)

// DELETE MESSAGE 
router.route("/deleteMessage/:id").delete(deleteMessage)

// ADMIN PANEL
router.route("/admin").get(getAdminPage)

// MESSAGES DATABASE, REPLY BY MAIL
router.route("/mailReply").post(mailReply)

// ADMIN
// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
module.exports = router;
