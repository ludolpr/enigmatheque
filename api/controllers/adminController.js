
exports.getAdminPage = (req, res) => {
  console.log("getAdminPage",getAdminPage);
  res.render("admin", {
    // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
    layout: "adminLayout",
  });
};

// exports.createArticle = (req, res) => {
//     console.log("createArticle", createArticle);
//     res.render("admin", {
//       // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
//       layout: "adminLayout",
//     });
//   };
  