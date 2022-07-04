const { Router } = require("express");
const router = Router();

const { getAdminPage } = require("./controllers/adminController");

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/proposer", (req, res) => {
  res.render("proposer");
});

// profile
router.get("/profile", (req, res) => {
  res.render("profile");
});

// éngimes
router.get("/enigme", (req, res) => {
  // console.log(req.query);
  res.render("enigme", {
    titre: req.query.q,
  });
});

router.get("/enigme/:id", (req, res) => {
  res.render("enigme_details");
});
// devinettes
router.get("/devinettes", (req, res) => {
  // console.log(req.query);
  res.render("devinettes", {
    titre: req.query.q,
  });
});
router.get("/devinettes/:id", (req, res) => {
  res.render("enigme_details");
});
// le sage
router.get("/lesage", (req, res) => {
  // console.log(req.query);
  res.render("lesage", {
    titre: req.query.q,
  });
});
// inscription
router.get("/inscription", (req, res) => {
  res.render("inscription");
});

// router.get("/admin", (req, res) => {
//   console.log("fergdrtsgdsfgdfgdfgdfg 22222");

//   res.render("admin");
// });

router.get("/lesage/:id", (req, res) => {
  res.render("enigme_details");
});

// Admin
// 2nd Layout
router.route("/admin").get(getAdminPage);
console.log('getAdminPage', getAdminPage);

module.exports = router;
