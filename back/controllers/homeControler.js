const getPageHome = async (req, res) => {
  const dbEnigmes = await db.query(
    // ORDER BY id_enigme DESC LIMIT 3 => me prend les trois derniere enigme poster pour les afficher
    `SELECT * FROM enigme WHERE is_Verified=1 ORDER BY id_enigme DESC LIMIT 3`
  );
  // console.log(dbEnigmes);
  res.render("home", {
    enigmes: dbEnigmes,
  });
};

module.exports = { getPageHome };
