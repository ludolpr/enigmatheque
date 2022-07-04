const { Router } = require("express");
const router = Router();
const { getAdminPage } = require("./controllers/adminController");
// page home
router.get("/", (req, res) => {
  res.render("home");
});

// liste des éngimes + id
router.get("/enigme", (req, res) => {
  // console.log(req.query);
  res.render("enigme", {
    titre: req.query.q,
  });
});
router.get("/enigme/:id", (req, res) => {
  res.render("enigme_details");
});

// page de proposition d'énigme
router.get("/proposer", (req, res) => {
  res.render("proposer");
});

//liste des devinettes + id
router.get("/devinettes", (req, res) => {
  // console.log(req.query);
  res.render("devinettes", {
    titre: req.query.q,
  });
});
router.get("/devinettes/:id", (req, res) => {
  res.render("enigme_details");
});

// liste du sage + id
router.get("/lesage", (req, res) => {
  // console.log(req.query);
  res.render("lesage", {
    titre: req.query.q,
  });
});
router.get("/lesage/:id", (req, res) => {
  res.render("enigme_details");
});

// profile
router.get("/profile", (req, res) => {
  res.render("profile");
});

// inscription
router.get("/inscription", (req, res) => {
  res.render("inscription");
});

// page de l'administrateur
router.get("/admin", (req, res) => {
  console.log("fergdrtsgdsfgdfgdfgdfg 22222");

  res.render("admin");
});
// 2nd Layout
router.route("/admin").get(getAdminPage);
console.log('getAdminPage', getAdminPage);

module.exports = router;
