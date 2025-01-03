const flash = require("flash");

exports.checkReponse = async (req, res) => {
  // console.log("params:",req.params);

  const { id } = req.params;
  const { solus } = req.body;

  // console.log("id:", id);
  // console.log("solus:",solus);

  let [enigme] = await db.query(`select * from enigme where id_enigme=${id}`);
  //   console.log(enigme.solus.toString().toLowerCase().replaceAll("<p>", " "));
  if (solus) {
    if (
      enigme.solus.toString().toLowerCase() ===
        "<p>" + solus.toString().toLowerCase() + "</p>" ||
      enigme.solus.toString().toLowerCase() === solus.toString().toLowerCase()
    )
      res.render("enigme_details", { enigme, flash: "Réponse exacte" });
    else res.render("enigme_details", { enigme, flash: "Mauvaise réponse" });
  } else
    res.render("enigme_details", { enigme, flash: "Il manque une réponse" });
};
