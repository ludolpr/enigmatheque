/* ERROR 404 */
const page404 = async (req, res) => {
  res.render("page404", {
    flash: "Erreur de liens",
  });
};

module.exports = { page404 };
