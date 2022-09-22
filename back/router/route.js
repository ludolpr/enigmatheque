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
  { login, inscription, logout, getPageInscription,getPageVerification } = require("../controllers/authController"), 
  {checkMembre} = require("../../public/js/adminCheck"),
  {GetResetPassword,PostResetPassword,PutResetPassword} = require("../controllers/userController"),
  {checkResponse} = require("../controllers/checkResponse")
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
router.route("/verification/:token").get(getPageVerification)
router.route('/resetpassword')
.get(GetResetPassword) // c'est la page du formulaire 
.post(PostResetPassword) // c'est le formulaire de mot de passe oublier ( /connexion )
.put(PutResetPassword) // c'est le formulaire d'edition du mot de passe ( /resetPassword )

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
router.route("checkResponse").post(checkResponse)
// PROPOSER ÉNIGME
router.route("/proposer").get(getPageProposer)
router.route("/insertEnigme").post(postEnigme)

// EDIT ENIGME
router.route("/updateEnigme/:id").put(putEnigme)

// DELETE ÉNIGME
router.route("/deleteEnigme/:id").delete(deleteEnigme)

// ----------------------------------------------------------------------- //
// -----------------------------PROFIL------------------------------------ //
// ----------------------------------------------------------------------- //

// profile ID
router.route("/profil/:id").get(profilId)
// EDIT PROFILE ID
router.route("/profilEdit/:id").put(upload.single("avatar"), profilEdit)

// router.route("/checkRoles").put(checkMembre)
// ----------------------------------------------------------------------- //
// -------------------------MESSAGE A L'ADMIN----------------------------- //
// ----------------------------------------------------------------------- //

// MESSAGE A L'ADMIN
router.route("/message").post(message)
// MAIL
router.get('/verification/:token',(req, res) => {
        
  const {token} = req.params;

  jwt.verification(token, 'MaCleSecrete', function(err, decoded){
          if(err){
                  console.log(err);
                  res.send('Email de verification echoué, le lien est invalide');
          }
          else{
                  
                  res.send('Email de verification success');
          }
  })
})
// ----------------------------------------------------------------------- //
// -------------------------------ADMIN----------------------------------- //
// ----------------------------------------------------------------------- //
// router.use(isAdmin)



// GET MESSAGE
router.route("/message/:id").get(messageId)

// DELETE MESSAGE 
router.route("/deleteMessage/:id").delete(deleteMessage)

// ADMIN PANEL
router.route("/admin").get(getAdminPage)

// MESSAGES DATABASE, REPLY BY MAIL
router.route("/mailReply").post(mailReply)



// ----------------------------------------------------------------------- //
// -----------------------------EXPORTS MODULE---------------------------- //
// ----------------------------------------------------------------------- //
module.exports = router;
