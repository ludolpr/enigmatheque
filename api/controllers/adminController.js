
exports.getAdminPage = (req, res) => {
  console.log("fergdrtsgdsfgdfgdfgdfg");
  res.render("admin", {
    // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
    layout: "adminLayout",
  });
};

exports.createArticle = (req, res) => {
    console.log("fergdrtsgdsfgdfgdfgdfg");
    res.render("admin", {
      // Quand nous utilisons un layout qui n'est pas celui par default nous devons le spécifié
      layout: "adminLayout",
    });
  };
  