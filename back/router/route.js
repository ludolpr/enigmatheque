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
  upload = require("../utils/multer");

// ----------------------------------------------------------------------- //
// --------------------------IMPORT DES CONTROLLER------------------------ //
// ----------------------------------------------------------------------- //

const { setSession } = require("../utils/setSession"),
  { getPageHome } = require("../controllers/homeControler"),
  { getAdminPage } = require("../controllers/adminController"),
  { MAIL_USER } = process.env,
  { middlewareImage } = require("../middlewares/middlewareImage"),
  {
    getEnigmeId,
    putEnigme,
    deleteEnigme,
    filtreEnigmes,
    postEnigme,
    getPageProposer,
  } = require("../controllers/enigmeControllers"),
  { mailReply, mailVisiteur } = require("../controllers/nodeMailer"),
  {
    message,
    messageId,
    deleteMessage,
  } = require("../controllers/messageAdmin"),
  { profilId, profilEdit } = require("../controllers/profil"),
  {
    login,
    inscription,
    logout,
    getPageInscription,
    getPageVerification,
  } = require("../controllers/authController"),
  {
    GetResetPassword,
    PostResetPassword,
    PutResetPassword,
  } = require("../controllers/userController"),
  { checkReponse } = require("../controllers/checkReponse");
// ----------------------------------------------------------------------- //
// ----------------------------------------------------------------------- //

const // IMPORT MIDDLEWARE
  { isAdmin } = require("../middlewares/admin"),
  { isSession } = require("../middlewares/isSession");

// home
router.route("/").get(getPageHome).post(mailVisiteur);
// INSCRIPTION$
router.route("/inscription").post(inscription).get(getPageInscription);

// ----------------------------------------------------------------------- //
// -------------------------------AUTH------------------------------------ //
// ----------------------------------------------------------------------- //

// LOGIN
router.route("/login").post(login);
// INSCRIPTION$
router.route("/inscription").post(inscription).get(getPageInscription);
router.route("/verification/:token").get(getPageVerification);
router
  .route("/resetpassword")
  .get(GetResetPassword) // c'est la page du formulaire
  .post(PostResetPassword) // c'est le formulaire de mot de passe oublier ( /connexion )
  .put(PutResetPassword); // c'est le formulaire d'edition du mot de passe ( /resetPassword )

//  session par utilisateur
router.use(isSession);

// // CONNECT REQUIRED
// LOGOUT
router.route("/logout").post(logout);

// ----------------------------------------------------------------------- //
// -------------------------------ENIGME---------------------------------- //
// ----------------------------------------------------------------------- //

// AFFICHER ENIGME
router.route("/enigme/:id").get(getEnigmeId);
router.route("/enigme").get(filtreEnigmes);
router.route("/checkReponse/:id").post(checkReponse);
// PROPOSER ÉNIGME
router.route("/proposer").get(getPageProposer);
router.route("/insertEnigme").post(postEnigme);

// EDIT ENIGME
router.route("/updateEnigme/:id").put(putEnigme);

// DELETE ÉNIGME
router.route("/deleteEnigme/:id").delete(deleteEnigme);

// ----------------------------------------------------------------------- //
// -----------------------------PROFIL------------------------------------ //
// ----------------------------------------------------------------------- //

// profil ID
router.route("/profil/:id").get(profilId);
// EDIT PROFIL ID
router.route("/profilEdit/:id").put(upload.single("avatar"), profilEdit);

// router.route("/checkRoles").put(checkMembre)
// ----------------------------------------------------------------------- //
// -------------------------MESSAGE A L'ADMIN----------------------------- //
// ----------------------------------------------------------------------- //

// MESSAGE A L'ADMIN
router.route("/message").post(message);
// MAIL
router.get("/verification/:token", (req, res) => {
  const { token } = req.params;

  jwt.verification(token, "MaCleSecrete", function (err, decoded) {
    if (err) {
      // console.log(err);
      res.send("Email de verification echoué, le lien est invalide");
    } else {
      res.send("Email de verification success");
    }
  });
});

// ----------------------------------------------------------------------- //
// -------------------------------ADMIN----------------------------------- //
// ----------------------------------------------------------------------- //
router.use(isAdmin); // middleware admin donne accè au routes ci-dessous

// GET MESSAGE
router.route("/message/:id").get(messageId);

// DELETE MESSAGE
router.route("/deleteMessage/:id").delete(deleteMessage);

// ADMIN PANEL
router.route("/admin").get(getAdminPage);

// MESSAGES DATABASE, REPLY BY MAIL
router.route("/mailReply").post(mailReply);
// // /******************Page 404*********************/
router.use("*", function (req, res) {
  res.status(404).render("404", {
    layout: "page404",
  });
});
// /****************** Fin Page 404*********************/
// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
module.exports = router;
