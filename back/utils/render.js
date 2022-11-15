const rdnEnigme = async function (res, id, flash) {
    const enigme = await db.query(`SELECT * FROM enigme WHERE id=${id}`);
    let enigmes;

    if (!enigme[0]) {
      enigmePost = [];
    } else {
      enigmePost = await db.query(
        `SELECT commentaires.*, users.name FROM commentaires INNER JOIN users ON commentaires.user_id=users.id WHERE commentaires.article_id=${articles[0].id}`
      );
    }

    const data = {
      enigme,
      enigmePost,
    };

    res.render("id_enigme", {
      data,
      flash,
    });
  },
  rndAdmin = async function (res, flash) {
    // Récupération de tout les articles
    const enigme = await db.query(`SELECT * FROM enigme`);

    // Rendu de la page admin avec les data de la requête précédente
    res.render("admin", {
      layout: "admin",
      articles,
      flash,
    });
  };

module.exports = { RndArticle, RndAdmin };
